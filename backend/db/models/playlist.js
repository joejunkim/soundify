'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const columnMapping = {
        through: 'SongToPlaylist',
        foreignKey: 'playListId',
        otherKey: 'songId'
      }

      Playlist.belongsToMany(models.Song, columnMapping);
      Playlist.belongsTo(models.Library, { foreignKey: 'libraryId' });
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
