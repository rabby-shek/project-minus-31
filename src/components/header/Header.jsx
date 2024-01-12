// Header.jsx

import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header-title">project minus-31</h1>
      <div className="header-icons">
        <IoPersonOutline className="header-icon" />
      </div>
    </div>
  );
};

export default Header;
