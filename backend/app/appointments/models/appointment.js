"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {

    static associate(models) {
      Appointment.belongsTo(models.Patient, {
        foreignKey: "patient_id",
        as: "patient",
      });
      Appointment.belongsTo(models.Doctor, {
        foreignKey: "doctor_id",
        as: "doctor",
      });
      Appointment.hasOne(models.Prescription, {
        foreignKey: "appointment_id",
        as: "prescription",
      });
    }
  }
  Appointment.init(
    {
      patient_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      reason: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appointment",
      tableName: "appointments",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Appointment;
}; 