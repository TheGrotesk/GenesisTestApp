'use strict';
import uuid from 'uuid/v4';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clients', {
        id   : {
          type 	     : Sequelize.UUID,
          allowNull    : false,
          primaryKey   : true,
          default : uuid()
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clients', {

    });
  }
};
