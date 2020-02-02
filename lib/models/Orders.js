import Sequelize from 'sequelize';
import { NotFoundError, DatabaseError, CourierNotAvailable } from '../errors';

export default class Orders extends Sequelize.Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id   : {
				type 	     : Sequelize.UUID,
				allowNull    : false,
				primaryKey   : true,
				defaultValue : Sequelize.UUIDV4
			},
			clientId : {
				type	: Sequelize.UUID,
				allowNull : false,
				references : {
					model : 'Clients',
					key: 'id'
				}
			},
			restaurantId : {
				type      : Sequelize.UUID,
				allowNull : false,
				references : {
					model: 'Restaurants',
					key: 'id'
				}
			},
			courierId : {
				type 	  : Sequelize.UUID,
				allowNull : false,
				references : {
					model: 'Couriers',
					key: 'id'
				}
			},
			orderedAt: {
				type: Sequelize.DATE,
				defaultValue: new Date()
			},
			deliveryAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DATE, 
				default: new Date()
			},
			updatedAt: {
				type: Sequelize.DATE, 
				default: new Date()
			}
		}, {
			tableName: "Orders",
			timestamps: true,
			sequelize
		});
	}

	static getAllOrders(attributes = null) {
		return this.findAll({
			attributes,
			order : [ 'createdAt' ]
		}); 
	}

	static async findOneById(id) {
		const order = await this.findOne({
			where : {
				id
			}
		});

		if (!order) {
            throw new NotFoundError("Order not found!", {
                id : "NOT_FOUND"
            });
		}
		
		return order;
	}

	static async createFromArray(array, db)  {
		try {
			const Couriers = db.getModel('Couriers');

			await Promise.all(array.map(async item => {
				const courier = await Couriers.findOneById(item.courierId);

				if (!courier) {
					throw new NotFoundError("Courier not found!", {
						courierId : "NOT_FOUND"
					});
				}

				if (!courier.getAvailability()) {
					throw new CourierNotAvailable("Courier not availble right now!", {
						courierId : "NOT_AVAILABLE"
					});
				}

				if (courier.restaurantId !== item.restaurantId) {
					throw new CourierNotAvailable("Courier does't work in this restaurant!", {
						restaurantId : "INVALID"
					});
				}
			}));

			const orders = await this.bulkCreate(array);

			return orders;
		} catch (err) {
			throw err;
		}
	}

	static associate(sequelize) {
		const Clients = sequelize.model('Clients');
		const Restaurants = sequelize.model('Restaurants');
		const Couriers = sequelize.model('Couriers');
		
		this.belongsTo(Clients, {foreignKey: 'id'});
		this.belongsTo(Restaurants, {foreignKey: 'id'});
		this.belongsTo(Couriers, {foreignKey: 'id'});
	}
}