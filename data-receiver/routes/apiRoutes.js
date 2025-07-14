const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/data", apiController.getData);
router.get("/data/:device_id", apiController.getSensorData);
router.get("/sensors", apiController.getSensors);
router.get("/sensors/status", apiController.getSensorStatus);
router.get("/stats", apiController.getStats);
router.post("/data/filter", apiController.getFilteredSensorData);
module.exports = router;
