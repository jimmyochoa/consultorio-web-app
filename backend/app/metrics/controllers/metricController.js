const {
  Doctor,
  SpecialtyArea,
  Patient,
  Appointment,
} = require("../../../models");

const { Op, fn, col } = require("sequelize");

module.exports = {
  async getMetrics(req, res) {
    try {
      const doctorId = req.params.id;
      if (!doctorId)
        return res.status(400).json({ message: "doctor_id is required" });

      const doctor = await Doctor.findByPk(doctorId, {
        include: { model: SpecialtyArea, as: "specialtyArea" },
      });
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });

      // Total doctores
      const totalDoctors = await Doctor.count();

      // Total pacientes
      const totalPatients = await Patient.count();

      // Doctores por especialidad
      const doctorsBySpecialtyRaw = await Doctor.findAll({
        attributes: [
          "specialty_area_id",
          [fn("COUNT", col("Doctor.id")), "count"], // <-- corregido aquí
        ],
        group: ["specialty_area_id"],
        include: [
          { model: SpecialtyArea, as: "specialtyArea", attributes: ["name"] },
        ],
        raw: true,
        nest: true,
      });

      // Formatear resultado para frontend
      const doctorsBySpecialty = doctorsBySpecialtyRaw.map((item) => ({
        specialty: item.specialtyArea.name,
        count: item.count,
      }));

      // Citas pasadas y futuras para el doctor
      const now = new Date();

      const pastAppointments = await Appointment.count({
        where: {
          doctor_id: doctorId,
          end_time: { [Op.lt]: now },
        },
      });

      const upcomingAppointments = await Appointment.count({
        where: {
          doctor_id: doctorId,
          start_time: { [Op.gt]: now },
        },
      });

      return res.json({
        doctorName: `${doctor.first_name} ${doctor.last_name}`,
        specialtyArea: doctor.specialtyArea.name,
        totalDoctors,
        totalPatients,
        doctorsBySpecialty,
        pastAppointments,
        upcomingAppointments,
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
};