const { SpecialtyArea } = require("../../../models");

module.exports = {
  // Obtener todas las especialidades
  async getAll(req, res) {
    try {
      const areas = await SpecialtyArea.findAll();
      res.status(200).json(areas);
    } catch (error) {
      console.error("Error en getAll specialtyAreas:", error);
      res
        .status(500)
        .json({ message: "Error retrieving specialty areas", error });
    }
  },

  // Obtener una especialidad por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const area = await SpecialtyArea.findByPk(id);
      if (!area) {
        return res.status(404).json({ message: "Specialty area not found" });
      }
      res.status(200).json(area);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving specialty area", error });
    }
  },

  // Crear una nueva
  async create(req, res) {
    try {
      const { name } = req.body;
      const newArea = await SpecialtyArea.create({ name });
      res.status(201).json(newArea);
    } catch (error) {
      res.status(500).json({ message: "Error creating specialty area", error });
    }
  },

  // Actualizar una existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const area = await SpecialtyArea.findByPk(id);

      if (!area) {
        return res.status(404).json({ message: "Specialty area not found" });
      }

      await area.update({ name });
      res.status(200).json(area);
    } catch (error) {
      res.status(500).json({ message: "Error updating specialty area", error });
    }
  },

  // Eliminar una
  async delete(req, res) {
    try {
      const { id } = req.params;
      const area = await SpecialtyArea.findByPk(id);

      if (!area) {
        return res.status(404).json({ message: "Specialty area not found" });
      }

      await area.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: "Error deleting specialty area", error });
    }
  },
};
