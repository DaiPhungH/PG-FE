import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import banner1 from './banner1.jpg';
import './style.css';

const HeaderComponent = ({ onLogout, setCurrentAccount }) => {
  const [currentAccount, setCurrentAccountState] = useState(null);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("CurrentAccount"));
    setCurrentAccountState(account);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("CurrentAccount");
    setCurrentAccountState(null);
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <div className="left-section">
            <Link to="/" className="btn-text">
              Home
            </Link>
            <Link to="/shop" className="btn-text">
              Shop
            </Link>
          </div>
          <h2 className="header-title">BOUTIQUE</h2>
          <div className="right-section">
            {currentAccount ? (
              <>
                <span className="me-3">Xin chào, {currentAccount.username}</span>
                <Link to="/cart" className="btn-text me-2">
                  Cart
                </Link>
                <button
                  className="btn-text logout"
                  type="button"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-text me-2">
                  Login
                </Link>
                <Link to="/register" className="btn-text">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <img src={banner1} alt="Banner" />
      </div>
    </>
  );
};

export default HeaderComponent;
