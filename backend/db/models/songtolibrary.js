'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongToLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SongToLibrary.belongsTo(models.Library, { foreignKey: 'libraryId' })
    }
  };
  SongToLibrary.init({
    songId: DataTypes.INTEGER,
    libraryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SongToLibrary',
  });
  return SongToLibrary;
};
