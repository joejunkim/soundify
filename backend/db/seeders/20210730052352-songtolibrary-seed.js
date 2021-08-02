'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongToLibraries', [
      {
        songId: 1,
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        songId: 10,
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        songId: 15,
        libraryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('SongToLibraries', null, {});
  }
};
