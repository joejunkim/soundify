'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongToLibraries', [
      { songId: 1, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 111, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 89, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 56, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 15, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 80, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 33, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 98, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 77, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 70, libraryId: 1, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('SongToLibraries', null, {});
  }
};
