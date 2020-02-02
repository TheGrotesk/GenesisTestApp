'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Restaurants', {
      id: {
        type        : Sequelize.UUID,
        allowNull    : false,
        primaryKey   : true,
        defaultValue : Sequelize.UUIDV4 
      },
      name: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Restaurants');
  }
};