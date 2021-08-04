'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const columnMapping = {
        through: 'SongToPlaylist',
        foreignKey: 'songId',
        otherKey: 'playlistId'
      }

      const columnMapping2 = {
        through: 'SongToLibrary',
        foreignKey: 'songId',
        otherKey: 'libraryId'
      }

      Song.belongsToMany(models.Playlist, columnMapping);
      Song.belongsToMany(models.Library, columnMapping2);
      Song.belongsTo(models.Album, { foreignKey: 'albumId' });
    }
  };
  Song.init({
    name: DataTypes.STRING,
    source: DataTypes.STRING,
    albumId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
