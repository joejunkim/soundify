'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'Run River North',
        imgUrl: 'https://images.squarespace-cdn.com/content/v1/52f97993e4b0cf116f77966b/1548446164801-JQAHFK3SU8ARSH1RYWTN/Banner02.jpg?format=1500w',
        description: "Run River North, formerly known as Monsters Calling Home, are a Korean-American group from Los Angeles, California. Starting as a indie folk-rock band, they've transitioned to an alt-rock trio, consisting of Alex Hwang, Sally Kang, and Daniel Chae.",
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
      {
        name: 'Ariana Grande',
        imgUrl: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952',
        description: 'Ariana Grande-Butera is an American singer and actress. She has received numerous accolades throughout her career, including two Grammy Awards, one Brit Award, two Billboard Music Awards, three American Music Awards, nine MTV Video Music Awards, and 26 Guinness World Records.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'The Weeknd',
        imgUrl: 'https://static.billboard.com/files/2020/06/the-weeknd-2020-cr-Pari-Dukovic-billboard-1548-1593528016-compressed.jpg',
        description: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter and record producer. Born in Toronto and raised in Scarborough, Tesfaye began his recording career in 2009 by anonymously uploading his song "Do It" to YouTube. Two years later, he met music executives Sal Slaiby and Amir Esmailian, with whom he founded XO Records. The letter E was excluded to avoid trademark problems with Canadian band the Weekend.',
        createdAt: new Date(),
        updatedAt: new Date()}
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
