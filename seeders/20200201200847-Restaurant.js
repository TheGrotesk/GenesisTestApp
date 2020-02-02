'use strict';
import uuid from 'uuid/v4';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      id: uuid(),
      name: 'Dominos Pizza',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuid(),
      name: 'Pesto',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuid(),
      name: 'Sushi WOK',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', {
      where: {
        name: ['Dominos Pizza', 'Pesto', 'Sushi WOK']
      }
    });
  }
};
