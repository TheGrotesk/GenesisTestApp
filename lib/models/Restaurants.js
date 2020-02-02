import Sequelize from 'sequelize';
import { NotFoundError, DatabaseError } from './../errors';

export default class Restaurants extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		return super.init({
			id   : {
				type 	     : DataTypes.UUID,
				allowNull    : false,
				primaryKey   : true,
				defaultValue : DataTypes.UUIDV4
			},
			name : {
				type      : DataTypes.STRING,
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
}