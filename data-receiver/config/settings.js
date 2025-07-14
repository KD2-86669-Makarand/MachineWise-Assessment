module.exports = {
  PORT: 8080,
  MONGODB_URI: "mongodb://localhost:27017/sensorData",
  WEBSOCKET_PATH: "/stream/data",
  ALERT_THRESHOLDS: {
    TEMP: 5,
    VIBRATION: 0.08,
    CURRENT: 100,
  },
  OFFLINE_THRESHOLD_MINUTES: 5,
  DATA_TIMEOUT_SECONDS: 10,
};
