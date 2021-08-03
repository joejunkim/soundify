'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumToLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AlbumToLibrary.belongsTo(models.Library, { foreignKey: 'libraryId' })
    }
  };
  AlbumToLibrary.init({
    albumId: DataTypes.INTEGER,
    libraryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AlbumToLibrary',
  });
  return AlbumToLibrary;
};
