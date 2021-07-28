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
      Library.belongsTo(models.User, {foreignKey: 'userId'});
      Library.hasMany(models.Playlist, { foreignKey: 'libraryId'});
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
