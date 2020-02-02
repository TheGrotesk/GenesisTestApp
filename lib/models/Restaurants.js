import Sequelize from 'sequelize';
import { NotFoundError, DatabaseError } from './../errors';

export default class Restaurants extends Sequelize.Model {
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
			createdAt: {
				type: Sequelize.DATE, 
				default: new Date()
			},
			updatedAt: {
				type: Sequelize.DATE, 
				default: new Date()
			}
		}, {
			tableName: "Restaurants",
			timestamps: true,
			sequelize
		});
	}

	static getAllRestaurants(attributes = null) {
		return this.findAll({
			attributes,
			order : [ 'createdAt' ]
		}); 
	}

	static async findOneById(id) {
		const restaurant = await this.findOne({
			where : {
				id
			}
		});

		if (!restaurant) {
            throw new NotFoundError("Restaurant not found!", {
                id : "NOT_FOUND"
            });
		}
		
		return restaurant;
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
			const restaurants = await this.bulkCreate(array);

			return restaurants;
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	static async updateOneById(id, fields) {
		try {
			const restaurant = await this.findOneById(id);

			if (!restaurant) {
				throw new NotFoundError("Restaurant not found!", {
					id : "NOT_FOUND"
				});
			}

			restaurant.update(fields);

			return restaurant;
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	static associate(sequelize) {
		const Couriers = sequelize.model('Couriers');
		const Orders = sequelize.model('Orders');

		this.hasMany(Couriers, { foreignKey : 'restaurantId' });
		this.hasMany(Orders, { foreignKey : 'restaurantId'});
	}
}