const { Doctor } = require("../../../models");
const bcrypt = require("bcryptjs");

module.exports = {
  //login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const doctor = await Doctor.findOne({ where: { email } });

      if (!doctor) {
        return res.status(404).json({ message: "Datos inválidos" });
      }

      const passwordMatch = await bcrypt.compare(password, doctor.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Datos inválidos" });
      }

      // Solo devolvemos datos necesarios
      res.status(200).json({
        id: doctor.id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        specialty_area_id: doctor.specialty_area_id,
      });
    } catch (error) {
      res.status(500).json({ message: "Login error", error });
    }
  },

  // registrar un doctor
  async create(req, res) {
    try {
      const { first_name, last_name, email, password, specialty_area_id } =
        req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const existingDoctor = await Doctor.findOne({ where: { email } });
      if (existingDoctor) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const newDoctor = await Doctor.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        specialty_area_id,
      });
      res.status(201).json({
        id: newDoctor.id,
        first_name: newDoctor.first_name,
        last_name: newDoctor.last_name,
        email: newDoctor.email,
        specialty_area_id: newDoctor.specialty_area_id,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating doctor", error });
    }
  },
};
