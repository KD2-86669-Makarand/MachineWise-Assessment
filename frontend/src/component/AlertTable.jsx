import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DataTableCSS from "./DataTableCSS.css";
const DataTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      const requestBody = {};
      if (deviceId) requestBody.device_id = deviceId;
      if (type) requestBody.type = type;
      if (startDate) requestBody.start = new Date(startDate).toISOString();
      if (endDate) requestBody.end = new Date(endDate).toISOString();

      const response = await axios.post(
        "http://localhost:8080/api/data/filter",
        requestBody
      );
      setSensorData(response.data.data);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    } finally {
      setLoading(false);
    }
  };
  const alertData = sensorData.filter((item) => {
    return (
      (item.type === "temp" && item.value > 50) ||
      (item.type === "vibration" && item.value > 0.08) ||
      (item.type === "current" && item.value > 100)
    );
  });
  return (
    <>
      <Navbar />
      <div className="container data-table-container p-4 mt-4 min-vh-100">
        <center>
          <h2 className="text-center mb-4">
            <b>Alerts</b>
          </h2>
        </center>
        <div className="row justify-content-center mb-4">
          <div className="col-md-10">
            <div className="row g-3 filters-section">
              <div className="col-md-6">
                <label className="form-lable">
                  Start Date:{" "}
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </label>{" "}
              </div>
              <div className="col-md-6">
                <label>
                  End Date:{" "}
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </label>{" "}
              </div>
              <div className="col-md-6">
                <label>
                  Type:{" "}
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>Select Sensor</option>
                    <option value="vibration">Vibration</option>
                    <option value="temp">Temprature</option>
                    <option value="current">Current</option>
                  </select>
                </label>{" "}
              </div>
              <div className="col-md-6">
                <label>
                  Device ID:{" "}
                  <select
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                  >
                    <option value="">Select Sensor</option>
                    <option value="sensor-001">sensor-001(Vibration)</option>
                    <option value="sensor-002">sensor-002(Temprature)</option>
                    <option value="sensor-003">sensor-003(Current)</option>
                  </select>
                </label>
              </div>
              <div className="col-md-12 text-center">
                <button
                  className="btn btn-success mt-2"
                  onClick={fetchSensorData}
                >
                  Search
                </button>
              </div>
              {loading ? (
                <p>Loading......</p>
              ) : sensorData.length === 0 ? (
                <p>No data available</p>
              ) : (
                <table
                  className=" table-bordered table-striped text-center"
                  border="1"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>Device ID</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>Timestamp</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alertData.map((item) => (
                      <tr
                        key={item._id}
                        className={
                          (item.type === "temp" && item.value > 50) ||
                          (item.type === "vibration" && item.value > 0.08) ||
                          (item.type === "current" && item.value > 100)
                            ? "text-danger fw-bold"
                            : ""
                        }
                      >
                        <td>{item.device_id}</td>
                        <td>{item.type}</td>
                        <td>{item.value}</td>
                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
