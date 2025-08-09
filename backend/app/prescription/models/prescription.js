"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    static associate(models) {
      Prescription.belongsTo(models.Appointment, {
        foreignKey: "appointment_id",
        as: "appointment",
      });
    }
  }
  Prescription.init(
    {
      appointment_id: DataTypes.INTEGER,
      medication_details: DataTypes.STRING,
      instructions: DataTypes.STRING,
      precautions: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prescription",
      tableName: "prescriptions",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Prescription;
};