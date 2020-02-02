'use strict';
import uuid from 'uuid/v4';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [
      {
        id : uuid(),
        name : 'Garold'
      },
      {
        id : uuid(),
        name : 'Tony'
      },
      {
        id : uuid(),
        name : 'Fin'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', {});
  }
};
