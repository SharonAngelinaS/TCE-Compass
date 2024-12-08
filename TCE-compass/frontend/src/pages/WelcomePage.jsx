import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";
import Navbar from "../components/Navbar";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to TCE-Compass</h1>
        <h4 className="welcome-subtitle">
          Your Guide to TCE’s Departmental Spaces
        </h4>
        <button
          className="get-started-button"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
