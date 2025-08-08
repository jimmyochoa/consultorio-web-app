"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    await queryInterface.bulkInsert("doctors", [
      {
        first_name: "Ana",
        last_name: "Martínez",
        email: "ana.martinez@example.com",
        password: await bcrypt.hash("admin", saltRounds),
        specialty_area_id: 1, // asegúrate que exista esta área
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Carlos",
        last_name: "Pérez",
        email: "carlos.perez@example.com",
        password: await bcrypt.hash("admin", saltRounds),
        specialty_area_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("doctors", null, {});
  },
};
