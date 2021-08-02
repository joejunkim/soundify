'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      {
        name: 'Run River North',
        img: null,
        year: 2014,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drinking From A Salt Pond',
        img: null,
        year: 2016,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Creatures In Your Head',
        img: null,
        year: 2021,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The College Dropout',
        img: null,
        year: 2004,
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Late Registration',
        img: null,
        year: 2005,
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Continuum',
        img: null,
        year: 2006,
        artistId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
