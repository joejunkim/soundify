'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Playlists', [
      {
        title: 'Test Playlist',
        description: 'This is my test1 playlist to see if this is working!',
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Playlist 2',
        description: 'This is my test2 playlist to see if this is working!',
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Playlist 3',
        description: 'This is my test3 playlist to see if this is working!',
        libraryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
