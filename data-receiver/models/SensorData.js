const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config/settings");

const sensorDataSchema = new mongoose.Schema(
  {
    device_id: String,
    timestamp: Date,
    type: String,
    value: Number,
  },
  {
    strict: false,
    timestamps: true,
  }
);

sensorDataSchema.index({ device_id: 1 });
sensorDataSchema.index({ timestamp: 1 });
sensorDataSchema.index({ type: 1 });

module.exports = mongoose.model("SensorData", sensorDataSchema);
