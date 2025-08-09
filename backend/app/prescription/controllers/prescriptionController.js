const { Prescription, Appointment } = require("../../../models");

module.exports = {
  // Obtener todas las recetas
  async getAll(req, res) {
    try {
      const prescriptions = await Prescription.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Appointment,
            as: "appointment",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });
      res.status(200).json(prescriptions);
    } catch (error) {
      console.error("Error en getAll prescriptions:", error);
      res
        .status(500)
        .json({ message: "Error retrieving prescriptions", error });
    }
  },

  // Obtener una receta por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const prescription = await Prescription.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Appointment,
            as: "appointment",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });
      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving prescription", error });
    }
  },

  // Crear una nueva receta
  async create(req, res) {
    try {
      const newPrescription = await Prescription.create(req.body);
      res.status(201).json(newPrescription);
    } catch (error) {
      res.status(500).json({ message: "Error creating prescription", error });
    }
  },

  // Actualizar una receta existente
  async update(req, res) {
    try {
      const { id } = req.params;

      const prescription = await Prescription.findByPk(id);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      await prescription.update(req.body);
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ message: "Error updating prescription", error });
    }
  },

  // Eliminar una receta
  async delete(req, res) {
    try {
      const { id } = req.params;
      const prescription = await Prescription.findByPk(id);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      await prescription.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: "Error deleting prescription", error });
    }
  },
};