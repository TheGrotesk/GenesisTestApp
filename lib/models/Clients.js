import Sequelize from 'sequelize';
import { NotFoundError, DatabaseError } from '../errors';

export default class Clients extends Sequelize.Model {
	static init(sequelize, Sequelize) {
		return super.init({
			id   : {
				type 	     : Sequelize.UUID,
				allowNull    : false,
				primaryKey   : true,
				default : Sequelize.UUIDV4
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
			tableName: "Clients",
			timestamps: true,
			sequelize
		});
	}

	static getAllClient(attributes = null) {
		return this.findAll({
			attributes,
			order : [ 'createdAt' ]
		}); 
	}

	static async findOneById(id) {
		const client = await this.findOne({
			where : {
				id
			}
		});

		if (!client) {
            throw new NotFoundError("Client not found!", {
                id : "NOT_FOUND"
            });
		}
		
		return client;
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
			const clients = await this.bulkCreate(array);

			return clients;
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	static async updateOneById(id, fields) {
		try {
			const client = await this.findOneById(id);

			if (!client) {
				throw new NotFoundError("Client not found!", {
					id : "NOT_FOUND"
				});
			}

			client.update(fields);

			return client;
		} catch (err) {
			throw new DatabaseError(err.message);
		}
	}

	static associate(sequelize) {
		
	}
}