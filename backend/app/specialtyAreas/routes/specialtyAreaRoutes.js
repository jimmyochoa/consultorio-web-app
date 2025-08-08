const express = require("express");
const router = express.Router();

const specialtyAreaController = require("../controllers/specialtyAreaController");

router.get("/", specialtyAreaController.getAll);
router.get("/:id", specialtyAreaController.getById);
router.post("/", specialtyAreaController.create);
router.put("/:id", specialtyAreaController.update);
router.delete("/:id", specialtyAreaController.delete);

module.exports = router;
