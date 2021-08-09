'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongToPlaylists', [
      { songId: 85, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 3, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 105, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 44, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 72, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 90, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 25, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 121, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 49, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 119, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 78, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 100, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 11, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
      { songId: 33, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
      { songId: 111, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongToPlaylists', null, {});
}
};
