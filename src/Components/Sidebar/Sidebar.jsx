import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import Logout from './Logout'; // Import the LogoutModal component

const Sidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="sidebar">
      <div className="head">ProManage</div>
      <ul className="nav">
        <Link to={"/dashboard"} className="nav-item">
          <FontAwesomeIcon icon={faTable} className="icon" />
          Board
        </Link>
        <Link to={"/analytics"} className="nav-item">
          <FontAwesomeIcon icon={faChartBar} className="icon" />
          Analytics
        </Link>
        <Link to={"/settings"} className="nav-item">
          <FontAwesomeIcon icon={faCog} className="icon" />
          Settings
        </Link>
      </ul>
      <div className="logout" onClick={toggleModal}>
        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
        Logout
      </div>
      {showModal && <Logout onConfirmLogout={handleLogout} onClose={toggleModal} />}
    </div>
  );
};

export default Sidebar;
