import React from "react";
import { Link } from "react-router-dom";
import "../styles/SimpleNavbar.css"; // We'll create this CSS file

const SimpleNavbar = () => {
  return (
    <div className="simple-navbar">
      {/* Link to the homepage */}
      <Link to="/home" className="brand-title">
        TCE Compass
      </Link>
    </div>
  );
};

export default SimpleNavbar;
