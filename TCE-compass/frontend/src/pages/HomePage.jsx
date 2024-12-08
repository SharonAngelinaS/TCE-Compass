import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component
import "../styles/HomePage.css";

const departments = [
  "CSBS",
  "IT",
  "Computer Science",
  "Data Science",
  "EEE",
  "ECE",
  "Civil",
  "Mechatronics",
  "Mechanical",
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Add the Navbar component */}
      <Navbar />
      <div className="home-container">
        <div className="cards-container">
          {departments.map((department) => (
            <div
              key={department}
              className="department-card"
              onClick={() => navigate(`/floor/${department}`)}
            >
              <h3>{department}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
