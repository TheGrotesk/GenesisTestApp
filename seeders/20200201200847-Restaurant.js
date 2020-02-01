'use strict';
import uuid from 'uuid/v4';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurant', [{
      id: uuid(),
      name: "Dominos Pizza",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurant', {
      where: {
        id: uuid(),
        name: "Dominos Pizza"
      }
    });
  }
};
