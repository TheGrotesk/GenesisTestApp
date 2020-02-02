import Sequelize 						from 'sequelize';
import { NotFoundError, DatabaseError } from '../errors';

export default class Couriers extends Sequelize.Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id   : {
				type 	     : Sequelize.UUID,
				allowNull    : false,
				primaryKey   : true,
				defaultValue : Sequelize.UUIDV4
			},
			name : {
				type      : Sequelize.STRING,
				allowNull : false
			},
			restaurantId : {
				type : Sequelize.UUID,
				allowNull : false,
				references : {
					model: 'Restaurants',
					key: 'id'
				}
			},
			availability : {
				type : Sequelize.ENUM(['AVAILABLE', 'NOT_AVAILABLE']),
				allowNull : false,
				default : 'AVAILABLE'
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
			tableName: "Couriers",
			timestamps: true,
			sequelize
		});
	}

	static getAllCouriers(attributes = null) {
		return this.findAll({
			attributes,
			order : [ 'createdAt' ]
		}); 
	}

	static async findOneById(id) {
		const courier = await this.findOne({
			where : {
				id
			}
		});

		if (!courier) {
            throw new NotFoundError("Courier not found!", {
                id : "NOT_FOUND"
            });
		}
		
		return courier;
	}

	static async findByRestaurantId(restaurantId, db) {
		const Restaurants = db.getModel('Restaurants');

		const checkRestaurant = await Restaurants.findOneById(restaurantId);

		if (!checkRestaurant) {
			throw new NotFoundError("Restaurant not found!", {
                restaurantId : "NOT_FOUND"
            });
		}

		const couriers = await this.findAll({
			where : {
				restaurantId
			}
		});

		if (!couriers) {
            throw new NotFoundError("Couriers not found!", {
                restaurantId : "NOT_FOUND"
            });
		}
		
		return couriers;
	}

	static async deleteOneById(id) {
		try {
			const row = await this.findOneById(id);

			row.destroy();
		} catch(err) {
			throw err;
		}
	}

	static async createFromArray(array)  {
		try {
			const couriers = await this.bulkCreate(array);

			return couriers;
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	static async updateOneById(id, fields) {
		try {
			const courier = await this.findOneById(id);

			if (!courier) {
				throw new NotFoundError("Courier not found!", {
					id : "NOT_FOUND"
				});
			}

			courier.update(fields);

			return courier;
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	getAvailability() {
		return this.availability === 'AVAILABLE' ? true : false;
	}

	static associate(sequelize) {
		const Restaurants = sequelize.model('Restaurants');
		const Orders = sequelize.model('Orders');

		this.belongsTo(Restaurants, {foreignKey: 'restaurantId'});
		this.hasMany(Orders, {foreignKey: 'courierId'});
	}
}