const WebSocket = require("ws");
const SensorData = require("../models/SensorData");
const alertService = require("../service/alertService");
const { WEBSOCKET_PATH, DATA_TIMEOUT_SECONDS } = require("../config/settings");

let lastDataTime = new Date();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: WEBSOCKET_PATH });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    ws.on("message", async (message) => {
      // console.log(message);
      try {
        lastDataTime = new Date();
        const data = JSON.parse(message);
        data.timestamp = new Date(data.timestamp);
        // console.log(data);

        const sensorData = new SensorData(data);
        await sensorData.save();

        alertService.checkAlerts(data);
      } catch (err) {
        console.error("Error processing message:", err);
      }
    });
  });

  setInterval(() => {
    const now = new Date();
    if (now - lastDataTime > DATA_TIMEOUT_SECONDS * 1000) {
      alertService.emitStreamStopped();
    }
  }, DATA_TIMEOUT_SECONDS * 1000);
}

module.exports = { setupWebSocket };
