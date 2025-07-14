const SensorData = require("../models/SensorData");
const { OFFLINE_THRESHOLD_MINUTES } = require("../config/settings");
const dataService = require("../service/dataService");

module.exports = {
  getData: async (req, res) => {
    try {
      const data = await dataService.getData(req.query);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSensorData: async (req, res) => {
    try {
      const data = await dataService.getSensorData(
        req.params.device_id,
        req.query
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSensors: async (req, res) => {
    try {
      const sensors = await dataService.getSensors();
      res.json(sensors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSensorStatus: async (req, res) => {
    try {
      const status = await dataService.getSensorStatus();
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getStats: async (req, res) => {
    try {
      const stats = await dataService.getStats(req.query);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getFilteredSensorData: async (req, res) => {
    try {
      const { device_id, type, start, end } = req.body;

      if (!device_id || !type) {
        return res.status(400).json({
          error: "device_id and type are required",
        });
      }
      console.log(device_id, type, start, end);
      const query = {
        device_id,
        type,
        timestamp: {},
      };

      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);

      if (Object.keys(query.timestamp).length === 0) delete query.timestamp;

      const data = await SensorData.find(query).sort({ timestamp: 1 }).lean();

      res.json({
        success: true,
        count: data.length,
        data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },
};
