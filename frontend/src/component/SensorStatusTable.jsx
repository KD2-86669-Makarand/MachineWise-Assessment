import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SensorStatusTable = () => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensorStatus();
  }, []);

  const fetchSensorStatus = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/sensors/status");
      setSensors(res.data);
    } catch (error) {
      console.error("Error fetching sensor status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex-grow-1">
      <Navbar />
      <h2>Sensor Status</h2>
      {loading ? (
        <p>Loading sensor status...</p>
      ) : sensors.length === 0 ? (
        <p>No sensors found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Device ID</th>
              {/* <th>Type</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, i) => (
              <tr key={i}>
                <td>{sensor.device_id}</td>
                {/* <td>{sensor.type}</td> */}
                <td
                  style={{
                    color: sensor.status === "online" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {sensor.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SensorStatusTable;
