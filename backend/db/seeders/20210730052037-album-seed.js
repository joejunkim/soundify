'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', [
      { name: 'Run River North', img: null, year: 2014, artistId: 1, source: '2RyIQJb2ruv5nJ55EFEwyu?si=kihAuXuLRqSdnfpFGXbKvg&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Drinking From A Salt Pond', img: null, year: 2016, artistId: 1, source: '4w4xXUAHgIfXfCXD8oKOnA?si=Wtgjs6NEQYmXirC2hlR2TQ&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Creatures In Your Head', img: null, year: 2021, artistId: 1, source: '2TqBr7jZDQ6R4QKBdinORk?si=dzexpdNYR0WkUWyzT3aqjg&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'The College Dropout', img: null, year: 2004, artistId: 2, source: '4Uv86qWpGTxf7fU7lG5X6F?si=41eeefaf1de34af2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Late Registration', img: null, year: 2005, artistId: 2, source: '5ll74bqtkcXlKE7wwkMq4g?si=a7e17cfffd8147a7', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Continuum', img: null, year: 2006, artistId: 3, source: '1Xsprdt1q9rOzTic7b9zYM?si=mymJnIejTfeWPy5vWthTDw&dl_branch=1', createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
