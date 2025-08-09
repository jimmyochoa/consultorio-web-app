const express = require("express");

const router = express.Router();
const appointmentsController = require("../controllers/appointmentController");

router.get("/", appointmentsController.getAll);
router.get("/:id", appointmentsController.getById);
router.get("/doctor/:doctorId", appointmentsController.getByDoctorId);
router.post("/", appointmentsController.create);
router.put("/:id", appointmentsController.update);
router.delete("/:id", appointmentsController.delete);

module.exports = router;