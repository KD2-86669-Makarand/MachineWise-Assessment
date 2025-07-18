import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Navbar from "./Navbar";

const socket = io("http://localhost:8080");

const AlertBox = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("alert", (alert) => {
      console.log("ALERT:", alert);
      setAlerts((prev) => [alert, ...prev.slice(0, 49)]);
    });

    return () => {
      socket.off("alert");
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex-grow-1">
        <h1>Live Alert</h1>
        {alerts.length === 0 ? (
          <p>No alerts yet.</p>
        ) : (
          <table border="1" cellPadding="10" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Device ID</th>
                <th>Type</th>
                <th>Value</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <tr key={index}>
                  <td>{new Date(alert.timestamp).toLocaleString()}</td>
                  <td>{alert.device_id}</td>
                  <td>{alert.type.toUpperCase()}</td>
                  <td>{alert.value}</td>
                  <td style={{ color: "red" }}>{alert.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AlertBox;
