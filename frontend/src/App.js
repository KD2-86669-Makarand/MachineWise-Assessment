// import logo from "./logo.svg";
import "./App.css";
import AlertBox from "./component/AlertBox";
import Dashboard from "./component/Dashboard";
import DataTable from "./component/DataTable";
import SensorStatusTable from "./component/SensorStatusTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alerts from "./component/AlertTable";
import Footer from "./component/Footer";
function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-table" element={<DataTable />} />
          <Route path="/sensor-table" element={<SensorStatusTable />} />
          <Route path="/alert-box" element={<AlertBox />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
