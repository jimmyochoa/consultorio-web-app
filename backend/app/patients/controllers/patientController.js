const { Patient } = require("../../../models");

module.exports = {
  // Obtener todos los pacientes
  async getAll(req, res) {
    try {
      const patients = await Patient.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error en getAll patients:", error);
      res.status(500).json({ message: "Error retrieving patients", error });
    }
  },

  // Obtener un paciente por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving patient", error });
    }
  },

  // Crear un nuevo paciente
  async create(req, res) {
    try {
      const newPatient = await Patient.create(req.body);
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ message: "Error creating patient", error });
    }
  },

  // Actualizar un paciente existente
  async update(req, res) {
    try {
      const { id } = req.params;

      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      await patient.update(req.body);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: "Error updating patient", error });
    }
  },

  // Eliminar un paciente
  async delete(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      await patient.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: "Error deleting patient", error });
    }
  },
};