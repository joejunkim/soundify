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
        image: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/04/18/15/run-header.jpg?width=1200',
        libraryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dance Mix',
        description: 'Good vibes',
        libraryId: 2,
        image: 'https://campusrec.fsu.edu/wp-content/uploads/2019/02/dance.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Top Radio Hits',
        description: 'Popular songs',
        libraryId: 3,
        image: 'https://i.scdn.co/image/ab67706c0000bebb35c81de812517af2a6ac1919',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
