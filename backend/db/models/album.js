'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsTo(models.Artist, { foreignKey: 'artistId' });
      Album.hasMany(models.Song, { foreignKey: 'albumId' });
    }
  };
  Album.init({
    name: DataTypes.STRING,
    img: DataTypes.BLOB,
    year: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
