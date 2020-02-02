'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
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
        default: new Date()
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
        default: new Date(),
			}
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
