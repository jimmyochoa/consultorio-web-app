const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

router.get("/", doctorController.getAll);
router.get("/:id", doctorController.getById);
router.put("/:id", doctorController.update);
router.delete("/:id", doctorController.delete);

module.exports = router;
