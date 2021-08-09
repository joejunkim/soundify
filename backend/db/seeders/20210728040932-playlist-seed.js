'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: 'DJ JD',
        description: "It's always a kahoot",
        libraryId: 1,
        image: 'https://joekim.s3.us-west-2.amazonaws.com/DJ.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mylo's Dance",
        description: 'Track that progress!',
        libraryId: 1,
        image: 'https://joekim.s3.us-west-2.amazonaws.com/party.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chill Coding Vibes',
        description: 'This is fine',
        libraryId: 1,
        image: 'https://joekim.s3.us-west-2.amazonaws.com/thisisfine.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Running',
        description: 'Work up a sweat',
        image: 'https://joekim.s3.us-west-2.amazonaws.com/running.jpg',
        libraryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dance Mix',
        description: 'Good vibes',
        libraryId: 2,
        image: 'https://joekim.s3.us-west-2.amazonaws.com/dance-party.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Top Radio Hits',
        description: 'Popular songs',
        libraryId: 3,
        image: 'https://joekim.s3.us-west-2.amazonaws.com/topsongs.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
