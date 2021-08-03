'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistToLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArtistToLibrary.belongsTo(models.Library, { foreignKey: 'libraryId' })
    }
  };
  ArtistToLibrary.init({
    artistId: DataTypes.INTEGER,
    libraryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArtistToLibrary',
  });
  return ArtistToLibrary;
};
