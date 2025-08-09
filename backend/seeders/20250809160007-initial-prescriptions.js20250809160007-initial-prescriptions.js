"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("prescriptions", [
      {
        appointment_id: 1,
        medication_details: "Amoxicilina 500mg",
        instructions: "Tomar una cápsula cada 8 horas durante 7 días",
        precautions: "Evitar alcohol",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        appointment_id: 2,
        medication_details: "Ibuprofeno 400mg",
        instructions:
          "Tomar 1 tableta cada 6 horas según sea necesario para el dolor",
        precautions: "Tomar después de las comidas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        appointment_id: 3,
        medication_details: "Loratadina 10mg",
        instructions: "Tomar 1 tableta diariamente",
        precautions: "Evitar conducir si se siente somnoliento",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("prescriptions", null, {});
  },
};