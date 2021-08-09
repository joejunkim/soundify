'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SongToPlaylists', [
      { songId: 12, playlistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 106, playlistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 99, playlistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 62, playlistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 89, playlistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { songId: 85, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 3, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 100, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 109, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 88, playlistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { songId: 44, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 72, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 90, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 94, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 31, playlistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { songId: 25, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 121, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 49, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 56, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 106, playlistId: 4, createdAt: new Date(), updatedAt: new Date() },
      { songId: 119, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 78, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 59, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 91, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 13, playlistId: 5, createdAt: new Date(), updatedAt: new Date() },
      { songId: 11, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
      { songId: 33, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
      { songId: 89, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
      { songId: 7, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
      { songId: 78, playlistId: 6, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SongToPlaylists', null, {});
}
};
