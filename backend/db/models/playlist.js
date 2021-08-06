'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    // static async createPlaylist({ name, profileImageUrl, description, libraryId }) {
    //   const hashedPassword = bcrypt.hashSync(password);
    //   const playlist = await Playlist.create({
    //     name,
    //     email,
    //     hashedPassword,
    //   });
    //   return await User.scope('currentUser').findByPk(user.id);
    // };
    static associate(models) {
      const columnMapping = {
        through: 'SongToPlaylist',
        foreignKey: 'playlistId',
        otherKey: 'songId'
      }

      Playlist.belongsToMany(models.Song, columnMapping);
      Playlist.belongsTo(models.Library, { foreignKey: 'libraryId' });
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
