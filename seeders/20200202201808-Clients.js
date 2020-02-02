'use strict';
import uuid from 'uuid/v4';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [
      {
        id : uuid(),
        name : 'Garold',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : uuid(),
        name : 'Tony',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : uuid(),
        name : 'Fin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', {});
  }
};
