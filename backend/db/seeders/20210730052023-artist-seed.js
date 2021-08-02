'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'Run River North',
        img: null,
        description: 'Run River North, formerly known as Monsters Calling Home, is an American/Korean indie folk-rock band from Los Angeles, California.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kanye West',
        img: null,
        description: 'Kanye Omari West is an American rapper, singer, songwriter, record producer, businessman, and fashion designer. He has been influential in the 21st-century development of mainstream hip hop, popular music, and popular culture in general.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Mayer',
        img: null,
        description: 'John Clayton Mayer is an American singer, songwriter, guitarist, and record producer. Born and raised in Fairfield County, Connecticut, Mayer attended Berklee College of Music in Boston, but left and moved to Atlanta in 1997 with Clay Cook. ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
