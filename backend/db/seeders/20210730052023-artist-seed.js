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
        imgUrl: 'https://c.tribune.com.pk/2017/06/the-weeknd-1497333370.jpg',
        description: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter and record producer. Born in Toronto and raised in Scarborough, Tesfaye began his recording career in 2009 by anonymously uploading his song "Do It" to YouTube. Two years later, he met music executives Sal Slaiby and Amir Esmailian, with whom he founded XO Records. The letter E was excluded to avoid trademark problems with Canadian band the Weekend.',
        createdAt: new Date(),
        updatedAt: new Date() },
      {
        name: 'Taylor Swift',
        imgUrl: 'https://i0.wp.com/www.onthecomeuptv.com/wp-content/uploads/2015/06/Swift.jpg?fit=800%2C450&ssl=1',
        description: 'Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which is often inspired by her personal experiences, has received widespread media coverage and critical praise. With sales of over 200 million records worldwide, Swift is one of the best-selling music artists of all time.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'J. Cole',
        imgUrl: 'https://www.biography.com/.image/t_share/MTQ3Mzg3MjY0ODg2OTA4NTk5/j_cole_photo_by_isaac_brekken_wireimage_getty_503069628.jpg',
        description: 'Jermaine Lamarr Cole, known professionally as J. Cole, is an American rapper, singer, songwriter, and record producer. Cole is regarded as one of the most influential rappers of his generation. Cole has won a Grammy Award for Best Rap Song, a Billboard Music Award for Top Rap Album, three Soul Train Music Awards, and 8 BET Hip Hop Awards. All five of his albums have been certified platinum.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frank Ocean',
        imgUrl: 'https://media.gq.com/photos/5c2e6f47523c603ec00dd150/master/w_1600%2Cc_limit/frank-ocean-cover-gq-february-2019-01.jpg',
        description: 'Frank Ocean is an American singer, songwriter, record producer, rapper, photographer, and visual artist. He is recognized for his idiosyncratic musical style, introspective and elliptical songwriting, and wide vocal range. Music critics have credited him with revitalizing jazz and funk influenced R&B, as well as advancing the genre through his experimental approach. He is considered a representative artist of alternative R&B.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Olivia Rodrigo',
        imgUrl: 'https://www.rollingstone.com/wp-content/uploads/2021/06/OLIVIA01_sour_Grant-Spanier.jpg?resize=1800,1200&w=1800',
        description: 'Olivia Isabel Rodrigo is an American actress, singer, and songwriter. Her critically acclaimed debut album, Sour, was released on May 21, 2021. She released her singles "Drivers License", "Deja Vu", and "Good 4 U", with the first and third both reaching number one in both the US and UK.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'My Chemical Romance',
        imgUrl: 'https://pyxis.nymag.com/v1/imgs/30c/0e3/8deae1218769a4b90a5178cb23b610f219-24-mcr.rsquare.w330.jpg',
        description: "My Chemical romance (commonly abbreviated to MCR or My Chem) is an American rock band from Newark, New Jersey. The band's current lineup consists of lead vocalist Gerard Way, guitarists Ray Toro and Frank Iero, and bassist Mikey Way. Founded by Gerard, Mikey, Toro, and Matt Pelissier (and later joined by Iero), the band signed with Eyeball Records and released their debut album, I Brought You My Bullets, You Brought Me Your Love, in 2002.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
