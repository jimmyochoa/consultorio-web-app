const { Doctor } = require("../../../models");
const bcrypt = require("bcryptjs");

module.exports = {
  // Obtener todos los doctores
  async getAll(req, res) {
    try {
      const doctors = await Doctor.findAll({
        attributes: { exclude: ["password", "updated_at", "created_at"] },
        include: ["specialtyArea"],
      });
      res.status(200).json(doctors);
    } catch (error) {
      console.error("Error en getAll doctors:", error);
      res.status(500).json({ message: "Error retrieving doctors", error });
    }
  },

  // Obtener un doctor por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id, {
        attributes: { exclude: ["password", "updated_at", "created_at"] },
        include: ["specialtyArea"],
      });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving doctor", error });
    }
  },

  // Actualizar un doctor existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, password, specialty_area_id } =
        req.body;

      const doctor = await Doctor.findByPk(id);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      if (email) {
        const existingDoctor = await Doctor.findOne({ where: { email } });
        if (existingDoctor && existingDoctor.id !== id) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }
      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : doctor.password;

      await doctor.update({
        first_name,
        last_name,
        email,
        password,
        specialty_area_id,
      });
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Error updating doctor", error });
    }
  },

  // Eliminar un doctor
  async delete(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findByPk(id);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      await doctor.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: "Error deleting doctor", error });
    }
  },
};
