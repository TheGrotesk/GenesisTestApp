import Sequelize from 'sequelize';

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
}