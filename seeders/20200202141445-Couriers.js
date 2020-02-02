'use strict';
import uuid from 'uuid/v4';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Couriers', [
      {
        id: uuid(),
        name: 'Jake',
        restaurantId : 'e7063d11-241f-4877-8d18-481e8d525e0b',
        availability : 'AVAILABLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'Dave',
        restaurantId : 'e7063d11-241f-4877-8d18-481e8d525e0b',
        availability : 'NOT_AVAILABLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'Ban',
        restaurantId : '07259400-a4e0-4a55-b71c-57f05dbadc58',
        availability : 'NOT_AVAILABLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'Justy',
        restaurantId : '07259400-a4e0-4a55-b71c-57f05dbadc58',
        availability : 'AVAILABLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'Alex',
        restaurantId : '77c33894-83f3-464c-a398-5601f02115bf',
        availability : 'AVAILABLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'Oliver',
        restaurantId : '77c33894-83f3-464c-a398-5601f02115bf',
        availability : 'AVAILABLE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Couriers');
  }
};
