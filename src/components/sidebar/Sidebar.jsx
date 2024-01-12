import React from "react";
import { CiHome } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import { BsGraphDownArrow } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img
          src="https://wallpapercave.com/wp/wp11030601.jpg"
          alt=""
          className="sidebar-logo"
        />
      </div>
      <div className="sidebar-links">
        <ul>
          <li className="has-submenu">
            <a href="#">
              <CiHome />
            </a>
            <ul className="submenu submenu1">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </li>
          <li className="has-submenu">
            <a href="#">
              <IoFastFoodOutline />
            </a>
            <ul className="submenu submenu2">
              <li>
                <NavLink to="/all-food-items">All Food Items</NavLink>
              </li>
              <li>
                <NavLink to="/add-food-items">Add New Food Item</NavLink>
              </li>
              <li>
                <NavLink to="/update-food-items">Update Food item</NavLink>
              </li>
            </ul>
          </li>
          <li className="has-submenu">
            <a href="#">
              <BsGraphDownArrow />
            </a>
            <ul className="submenu submenu3">
              <li>
                <a href="#">Daily Profit</a>
              </li>
              <li>
                <a href="#">Weekly Profit</a>
              </li>
              <li>
                <a href="#">Monthly Profit</a>
              </li>
            </ul>
          </li>
          <li className="has-submenu">
            <a href="#">
              <CiSettings />
            </a>
            <ul className="submenu submenu4">
              <li>
                <a href="#">UI Settings</a>
              </li>
              <li>
                <a href="#">Print Settings</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
