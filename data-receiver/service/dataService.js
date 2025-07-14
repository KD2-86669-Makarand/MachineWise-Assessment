const SensorData = require("../models/SensorData");
const { OFFLINE_THRESHOLD_MINUTES } = require("../config/settings");

module.exports = {
  getData: async (queryParams) => {
    const { start, end, type } = queryParams;
    const query = { timestamp: {} };

    if (start) query.timestamp.$gte = new Date(start);
    if (end) query.timestamp.$lte = new Date(end);
    if (type) query.type = type;

    if (Object.keys(query.timestamp).length === 0) delete query.timestamp;

    return await SensorData.find(query).sort({ timestamp: 1 });
  },

  getSensorData: async (deviceId, queryParams) => {
    const { start, end } = queryParams;
    const query = { device_id: deviceId };

    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    return await SensorData.find(query).sort({ timestamp: 1 });
  },

  getSensors: async () => {
    return await SensorData.distinct("device_id");
  },

  getSensorStatus: async () => {
    const threshold = new Date(
      Date.now() - OFFLINE_THRESHOLD_MINUTES * 60 * 1000
    );

    const allSensors = await SensorData.distinct("device_id");
    const onlineSensors = await SensorData.distinct("device_id", {
      timestamp: { $gte: threshold },
    });

    const online = onlineSensors.map((id) => ({
      device_id: id,
      status: "online",
    }));
    const offline = allSensors
      .filter((id) => !onlineSensors.includes(id))
      .map((id) => ({ device_id: id, status: "offline" }));

    return [...online, ...offline];
  },

  getStats: async (queryParams) => {
    const { type, start, end } = queryParams;
    if (!type) {
      throw new Error("Type parameter is required");
    }

    const match = { type };
    if (start || end) {
      match.timestamp = {};
      if (start) match.timestamp.$gte = new Date(start);
      if (end) match.timestamp.$lte = new Date(end);
    }

    const result = await SensorData.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          min: { $min: "$value" },
          max: { $max: "$value" },
          avg: { $avg: "$value" },
          count: { $sum: 1 },
        },
      },
    ]);

    return result[0] || { min: null, max: null, avg: null, count: 0 };
  },
};

getSensorDataByType: async (req, res) => {
  try {
    const { device_id, type } = req.params;
    const { start, end } = req.query;

    const query = {
      device_id,
      type,
      timestamp: {},
    };

    if (start) query.timestamp.$gte = new Date(start);
    if (end) query.timestamp.$lte = new Date(end);

    if (Object.keys(query.timestamp).length === 0) delete query.timestamp;

    const data = await SensorData.find(query).sort({ timestamp: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
