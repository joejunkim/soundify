'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      { name: 'Run River North', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/810gVoa8GWL._SL1500_.jpg', year: 2014, artistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Channel Orange', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg', year: 2012, artistId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Creatures In Your Head', imgUrl: 'https://m.media-amazon.com/images/I/71jsgVOn9zL._SS500_.jpg', year: 2021, artistId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'The College Dropout', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/91ZZsD5t%2BzL._SX355_.jpg', year: 2004, artistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Late Registration', imgUrl: 'https://m.media-amazon.com/images/I/71kp8Gg6vmL._SS500_.jpg', year: 2005, artistId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Continuum', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Continuum_by_John_Mayer_%282006%29.jpg', year: 2006, artistId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sweetener', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Sweetener_album_cover.png/220px-Sweetener_album_cover.png', year: '2018', artistId: 4, createdAt: new Date(), updatedAt: new Date()},
      { name: 'After Hours', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png', year: '2020', artistId: 5, createdAt: new Date(), updatedAt: new Date()},
      { name: '1989', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png', year: '2014', artistId: 6, createdAt: new Date(), updatedAt: new Date()},
      { name: 'Evermore', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Taylor_Swift_-_Evermore.png', year: '2020', artistId: 6, createdAt: new Date(), updatedAt: new Date()},
      { name: 'Sob Rock', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/1/16/John_Mayer_-_Sob_Rock.png', year: '2021', artistId: 3, createdAt: new Date(), updatedAt: new Date()},
      { name: 'The Off-Season', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7d/TheOff-Season.jpeg', year: '2021', artistId: 7, createdAt: new Date(), updatedAt: new Date()},
      { name: 'Blonde', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg', year: '2016', artistId: 8, createdAt: new Date(), updatedAt: new Date()},
      { name: 'Sour', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png', year: '2021', artistId: 9, createdAt: new Date(), updatedAt: new Date()},
      { name: 'The Black Parade', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Blackparadecover.jpg', year: 2006, artistId: 10, createdAt: new Date(), updatedAt: new Date()},
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
