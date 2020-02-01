import Sequelize from 'sequelize';

export default class Restaurant extends Sequelize.Model {
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
			}
		}, {
			tableName: "Restaurant",
			sequelize
		});
	}
}