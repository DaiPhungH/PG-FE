import "bootstrap/dist/css/bootstrap.css";
import banner1 from './banner1.jpg'
import { Link, useLocation } from 'react-router-dom';
import LoginComponent from "../Auth";
const HeaderComponent = ({ onLogout, setCurrentAccount }) => {
  const logoutHandler = () => {
    localStorage.setItem("CurrentAccount",JSON.stringify(null));
    let currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
    
    // setCurrentAccount(null);
    // onLogout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex">
              {/* {currentAccount && <p> xin chao {currentAccount.username}</p>} */}
              <Link to="/login">
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={logoutHandler}
              >
                Login
              </button>
              </Link>
              <Link to="/login">
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={logoutHandler}
              >
                Logout
              </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <img src={banner1} style={{ height: "400px", width: "100%" }} />
      </div>
    </>
  );
};

export default HeaderComponent;