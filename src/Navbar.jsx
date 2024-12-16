import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h2>Shop</h2>
        <div className="logo"></div>
        <h2>IT</h2>
      </div>
      <ul className="menu">
        <li>
          <Link to="/"> Inventory </Link>
        </li>
        <li>
          <Link to="/Create">Create Item</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
