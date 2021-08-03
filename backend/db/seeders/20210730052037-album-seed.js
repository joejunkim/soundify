'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      { name: 'Run River North', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/810gVoa8GWL._SL1500_.jpg', year: 2014, artistId: 1, source: '2RyIQJb2ruv5nJ55EFEwyu?si=kihAuXuLRqSdnfpFGXbKvg&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Drinking From A Salt Pond', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81lZQsUKJYL._SL1500_.jpg', year: 2016, artistId: 1, source: '4w4xXUAHgIfXfCXD8oKOnA?si=Wtgjs6NEQYmXirC2hlR2TQ&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Creatures In Your Head', imgUrl: 'https://m.media-amazon.com/images/I/71jsgVOn9zL._SS500_.jpg', year: 2021, artistId: 1, source: '2TqBr7jZDQ6R4QKBdinORk?si=dzexpdNYR0WkUWyzT3aqjg&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'The College Dropout', imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/91ZZsD5t%2BzL._SX355_.jpg', year: 2004, artistId: 2, source: '4Uv86qWpGTxf7fU7lG5X6F?si=41eeefaf1de34af2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Late Registration', imgUrl: 'https://m.media-amazon.com/images/I/71kp8Gg6vmL._SS500_.jpg', year: 2005, artistId: 2, source: '5ll74bqtkcXlKE7wwkMq4g?si=a7e17cfffd8147a7', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Continuum', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Continuum_by_John_Mayer_%282006%29.jpg', year: 2006, artistId: 3, source: '1Xsprdt1q9rOzTic7b9zYM?si=mymJnIejTfeWPy5vWthTDw&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
