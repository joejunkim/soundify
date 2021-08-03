'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'Run River North',
        imgUrl: 'https://wsp-app-lifewtr.s3.amazonaws.com/images/default-source/life-unseen/industry/music/run-river-north/portraits-a_1x1_run-river-north.jpg?sfvrsn=15c914ca_2',
        description: 'Run River North, formerly known as Monsters Calling Home, is an American/Korean indie folk-rock band from Los Angeles, California.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kanye West',
        imgUrl: 'https://media.gq.com/photos/5ad93798ceb93861adb912d8/4:3/w_2683,h_2012,c_limit/kanye-west-0814-GQ-FEKW01.01.jpg',
        description: 'Kanye Omari West is an American rapper, singer, songwriter, record producer, businessman, and fashion designer. He has been influential in the 21st-century development of mainstream hip hop, popular music, and popular culture in general.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Mayer',
        imgUrl: 'https://images1.westword.com/imager/u/745xauto/12037195/jm_by_mark_seliger.jpg',
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
