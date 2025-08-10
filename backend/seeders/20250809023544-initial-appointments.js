"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("appointments", [
      {
        patient_id: 1,
        doctor_id: 1,
        start_time: new Date("2025-08-10T08:00:00"),
        end_time: new Date("2025-08-10T09:00:00"),
        reason: "Chequeo general",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 2,
        doctor_id: 1,
        start_time: new Date("2025-08-10T09:00:00"),
        end_time: new Date("2025-08-10T10:00:00"),
        reason: "Visita de seguimiento",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 3,
        doctor_id: 2,
        start_time: new Date("2025-08-11T10:00:00"),
        end_time: new Date("2025-08-11T11:00:00"),
        reason: "Consulta",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 4,
        doctor_id: 1,
        start_time: new Date("2025-08-11T11:00:00"),
        end_time: new Date("2025-08-11T12:00:00"),
        reason: "Limpieza dental",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 5,
        doctor_id: 2,
        start_time: new Date("2025-08-12T08:00:00"),
        end_time: new Date("2025-08-12T09:00:00"),
        reason: "Examen de la vista",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 6,
        doctor_id: 2,
        start_time: new Date("2025-08-12T09:00:00"),
        end_time: new Date("2025-08-12T10:00:00"),
        reason: "Terapia física",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 7,
        doctor_id: 1,
        start_time: new Date("2025-08-13T10:00:00"),
        end_time: new Date("2025-08-13T11:00:00"),
        reason: "Vacunación",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 8,
        doctor_id: 2,
        start_time: new Date("2025-08-13T11:00:00"),
        end_time: new Date("2025-08-13T12:00:00"),
        reason: "Chequeo de piel",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 9,
        doctor_id: 1,
        start_time: new Date("2025-08-14T08:00:00"),
        end_time: new Date("2025-08-14T09:00:00"),
        reason: "Análisis de sangre",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        patient_id: 10,
        doctor_id: 2,
        start_time: new Date("2025-08-14T09:00:00"),
        end_time: new Date("2025-08-14T10:00:00"),
        reason: "Consulta de nutrición",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};