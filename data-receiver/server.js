const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { setupWebSocket } = require("./controllers/websocketController");
const apiRoutes = require("./routes/apiRoutes");
const alertService = require("./service/alertService");
const { MONGODB_URI, PORT } = require("./config/settings");

const app = express();
const server = http.createServer(app);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

alertService.initializeAlertService(server);
setupWebSocket(server);

app.use(express.json());

// routess
app.use("/api", apiRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
