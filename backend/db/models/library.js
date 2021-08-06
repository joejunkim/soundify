'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const columnMapping = {
        through: 'SongToLibrary',
        foreignKey: 'libraryId',
        otherKey: 'songId'
      }

      const columnMapping2 = {
        through: 'AlbumToLibrary',
        foreignKey: 'libraryId',
        otherKey: 'albumId'
      }

      const columnMapping3 = {
        through: 'ArtistToLibrary',
        foreignKey: 'libraryId',
        otherKey: 'artistId'
      }

      Library.belongsToMany(models.Song, columnMapping);
      Library.belongsToMany(models.Album, columnMapping2)
      Library.belongsToMany(models.Artist, columnMapping3)
      Library.belongsTo(models.User, { foreignKey: 'userId' });
      Library.hasMany(models.Playlist, { foreignKey: 'libraryId' });
    }
  };
  Library.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Library',
  });
  return Library;
};
