"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.SpecialtyArea, {
        foreignKey: "specialty_area_id",
        as: "specialtyArea",
      });
    }
  }
  Doctor.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      specialty_area_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor",
      tableName: "doctors",
      underscored: true,
    }
  );
  return Doctor;
};
