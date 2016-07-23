'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Images', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    isProfilePicture: DataTypes.BOOLEAN,
    isBannerPicture: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  });
}
