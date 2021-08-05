'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: 'DJ JD',
        description: "It's always a kahoot",
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mylo's Dance",
        description: 'Track that progress!',
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chill Coding Vibes',
        description: 'This is fine',
        libraryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Running',
        description: 'Work up a sweat',
        libraryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dance Mix',
        description: 'Good vibes',
        libraryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Top Radio Hits',
        description: 'Popular songs',
        libraryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
