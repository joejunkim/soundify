'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      {
        name: 'Run River North',
        img: null,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drinking From A Salt Pond',
        img: null,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Creatures In Your Head',
        img: null,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Creatures In Your Head',
        img: null,
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The College Dropout',
        img: null,
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Late Registration',
        img: null,
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Graduation',
        img: null,
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Continuum',
        img: null,
        artistId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Battle Studies',
        img: null,
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
