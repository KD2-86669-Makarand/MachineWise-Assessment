const socketIo = require("socket.io");
const { ALERT_THRESHOLDS } = require("../config/settings");

let io;

function initializeAlertService(server) {
  console.log("Socket.IO server initialized.");
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false,
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function checkAlerts(data) {
  if (io) {
    io.emit("data", data);
  } else {
    console.warn("Socket.IO is not initialized.");
  }
  if (
    (data.type === "temp" && data.value > ALERT_THRESHOLDS.TEMP) ||
    (data.type === "vibration" && data.value > ALERT_THRESHOLDS.VIBRATION) ||
    (data.type === "current" && data.value > ALERT_THRESHOLDS.CURRENT)
  ) {
    io.emit("alert", {
      device_id: data.device_id,
      type: data.type,
      value: data.value,
      timestamp: data.timestamp,
      message: `Alert: ${data.type} ${data.value} exceeds threshold`,
    });
  }
}

function emitStreamStopped() {
  io.emit("stream_stopped", {
    message: "No data received for 10 seconds",
    lastDataTime: new Date(),
  });
}

module.exports = {
  initializeAlertService,
  checkAlerts,
  emitStreamStopped,
};
