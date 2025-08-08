"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "specialty_areas",
      [
        { name: "Cardiology", created_at: new Date(), updated_at: new Date() },
        { name: "Neurology", created_at: new Date(), updated_at: new Date() },
        { name: "Pediatrics", created_at: new Date(), updated_at: new Date() },
        { name: "Dermatology", created_at: new Date(), updated_at: new Date() },
        { name: "Oncology", created_at: new Date(), updated_at: new Date() },
        { name: "Orthopedics", created_at: new Date(), updated_at: new Date() },
        { name: "Psychiatry", created_at: new Date(), updated_at: new Date() },
        { name: "Radiology", created_at: new Date(), updated_at: new Date() },
        {
          name: "Gastroenterology",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ophthalmology",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("specialty_areas", null, {});
  },
};
