// Header.jsx

import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Header = ({handleLogut}) => {
  return (
    <div className="header-container">
      <h1 className="header-title">project minus-31</h1>
      <div className="header-icons">
        < IoPersonOutline className="header-icon" onClick={handleLogut} />
      </div>
    </div>
  );
};

export default Header;
