import Sequelize from 'sequelize';
import { NotFoundError } from './../errors';

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

	static getAllRestaurants() {
		return this.findAll({
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
}