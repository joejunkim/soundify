'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const columnMapping = {
        through: 'ArtistToLibrary',
        foreignKey: 'artistId',
        otherKey: 'libraryId'
      }

      Artist.belongsToMany(models.Library, columnMapping);
      Artist.hasMany(models.Album, { foreignKey: 'artistId' });
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
