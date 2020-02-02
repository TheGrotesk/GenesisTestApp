'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      id: 'e7063d11-241f-4877-8d18-481e8d525e0b',
      name: 'Dominos Pizza',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: '07259400-a4e0-4a55-b71c-57f05dbadc58',
      name: 'Pesto',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: '77c33894-83f3-464c-a398-5601f02115bf',
      name: 'Sushi WOK',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants');
  }
};
