'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Couriers', {
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
				defaultValue : 'AVAILABLE'
			},
			createdAt: {
				type: Sequelize.DATE, 
				default: new Date()
			},
			updatedAt: {
				type: Sequelize.DATE, 
				default: new Date()
			}
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Couriers');
  }
};
