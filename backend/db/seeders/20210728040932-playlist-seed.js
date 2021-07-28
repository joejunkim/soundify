'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Playlists', [
      {
        title: 'Test Playlist',
        description: 'This is my test playlist to see if this is working!',
        libraryId: 1
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
