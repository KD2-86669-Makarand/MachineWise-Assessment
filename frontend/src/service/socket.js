import { io } from "socket.io-client";

const socket = io("http://localhost:8080/stream/data", {
  transports: ["websocket"],
});

export default socket;
