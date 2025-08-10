const { Appointment, Patient, Doctor } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  // Obtener todas las citas
  async getAll(req, res) {
    try {
      const appointments = await Appointment.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Patient,
            as: "patient",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error en getAll appointments:", error);
      res.status(500).json({ message: "Error al obtener las citas", error });
    }
  },

  // Obtener una cita por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Patient,
            as: "patient",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });
      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la cita", error });
    }
  },

  // Obtener citas por ID de doctor
  async getByDoctorId(req, res) {
    try {
      const { doctorId } = req.params;
      const appointments = await Appointment.findAll({
        where: { doctor_id: doctorId },
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Patient,
            as: "patient",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error en getByDoctorId appointments:", error);
      res.status(500).json({ message: "Error al obtener las citas", error });
    }
  },

  // Crear una nueva cita
  async create(req, res) {
    try {
      const { doctor_id, patient_id, start_time, end_time, reason } = req.body;

      const startDate = new Date(start_time);
      const endDate = new Date(end_time);

      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      if (startHour < 8 || endHour > 18) {
        return res.status(400).json({
          message: "El horario laboral es de 8:00 a 18:00 horas",
        });
      }

      const overlapping = await Appointment.findOne({
        where: {
          doctor_id,
          [Op.or]: [
            {
              start_time: { [Op.lt]: end_time },
              end_time: { [Op.gt]: start_time },
            },
          ],
        },
      });

      if (overlapping) {
        return res.status(400).json({
          message: "La cita se superpone con otra existente",
        });
      }

      const newAppointment = await Appointment.create({
        doctor_id,
        patient_id,
        start_time,
        end_time,
        reason,
      });

      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la cita", error });
    }
  },

  // Actualizar una cita existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { doctor_id, patient_id, start_time, end_time, reason } = req.body;

      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }

      const startDate = new Date(start_time);
      const endDate = new Date(end_time);

      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      if (startHour < 8 || endHour > 18) {
        return res.status(400).json({
          message: "El horario laboral es de 8:00 a 18:00 horas",
        });
      }

      const overlapping = await Appointment.findOne({
        where: {
          doctor_id,
          id: { [Op.ne]: id }, // excluir la cita actual
          start_time: { [Op.lt]: end_time },
          end_time: { [Op.gt]: start_time }
        }
      });


      if (overlapping) {
        return res.status(400).json({
          message: "La cita se superpone con otra existente",
        });
      }

      const appointmentUpdated = await appointment.update({
        doctor_id,
        patient_id,
        start_time,
        end_time,
        reason,
      });
      res.status(200).json(appointmentUpdated);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la cita", error });
    }
  },

  // Eliminar una cita
  async delete(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);

      if (!appointment) {
        return res.status(404).json({ message: "Cita no encontrada" });
      }

      await appointment.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la cita", error });
    }
  },
};
