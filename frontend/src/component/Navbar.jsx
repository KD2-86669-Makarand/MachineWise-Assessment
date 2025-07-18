const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-grey bg-light">
        <a className="navbar-brand" href="">
          MachineWise
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">
                Dashboard <span className="sr-only"></span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/data-table">
                Data Table
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sensor-table">
                Sensor Status
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/alerts">
                Alerts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/alert-box">
                Live Alert
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
