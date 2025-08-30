import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DepartmentFloorPage.css";
import SimpleNavbar from "../components/SimpleNavbar"; // Import the SimpleNavbar

const departmentFloors = {
  CSBS: {
    "IT Ground Floor": "/IT ground floor.jpg",
    "IT Third Floor": "/IT third floor.jpg",
  },
  IT: {
    "IT Ground Floor": "/IT ground floor.jpg",
    "IT First Floor": "/IT first floor.jpg",
    "IT Second Floor": "/ITSECOND FLOOR.png",
  },
  "Data Science": {
    "Ladies Room": "/Ladies Room.png",
    "IT Ground Floor": "/IT ground floor.jpg",
    "IT Second Floor": "/ITSECOND FLOOR.png",
  },
  EEE: {
    "EEE Block": "/EEE block.png",
  },
  ECE: {},
  Civil: {},
  Mechanical: {},
  Mechatronics: {
    "Ground Floor": "/SBgroundfloor.jpg",
    "First Floor": "/SBfirstfloorm.jpg",
    "Second Floor": "/SBSecondfloor.jpg",
    "Third Floor": "/SBThirdfloor.jpg",
  },
  English:{
    "Second Floor": "/SBSecondfloor.jpg",
  },
  Mathematics:{
    "Second Floor": "/SBSecondfloor.jpg",
  },
  Physics:{
    "First Floor": "/SBfirstfloorm.jpg",
  },
  Chemistry:{
    "Ground Floor": "/SBgroundfloor.jpg",
  }
};

const DepartmentFloorPage = () => {
  const { department } = useParams();

  const floorsForDepartment = departmentFloors[department];

  if (!floorsForDepartment || Object.keys(floorsForDepartment).length === 0) {
    return (
      <>
        <SimpleNavbar /> {/* Add the SimpleNavbar */}
        <div className="floor-page-container">
          <h2>{department} Floor Plans</h2>
          <p>No floor plans available for this department.</p>
        </div>
      </>
    );
  }

  const [selectedFloor, setSelectedFloor] = useState(
    Object.keys(floorsForDepartment)[0]
  );

  return (
    <>
      <SimpleNavbar /> {/* Add the SimpleNavbar */}
      <div className="floor-page-container">
        <h2>{department} Floor Plans</h2>
        <div className="floor-buttons">
          {Object.keys(floorsForDepartment).map((floor, index) => (
            <button
              key={index}
              className={`floor-button ${
                selectedFloor === floor ? "active" : ""
              }`}
              onClick={() => setSelectedFloor(floor)}
            >
              {floor}
            </button>
          ))}
        </div>
        <div className="floor-image-container">
          <img
            src={floorsForDepartment[selectedFloor]}
            alt={`${selectedFloor} for ${department}`}
            className="floor-image"
          />
        </div>
      </div>
    </>
  );
};

export default DepartmentFloorPage;
