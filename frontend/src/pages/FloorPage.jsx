import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FloorPage.css";

const floorImages = {
  csbs: {
    "ground floor": "/IT ground floor.jpg",
    "third floor": "/IT third floor.jpg",
  },
  it: {
    "ground floor": "/IT ground floor.jpg",
    "first floor": "/IT first floor.jpg",
    "second floor": "/IT third floor.jpg",
  },
};

const FloorPage = () => {
  const { department } = useParams();
  const [selectedFloor, setSelectedFloor] = useState("ground floor");

  const departmentFloors = floorImages[department.toLowerCase()] || {};

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  return (
    <div className="floor-page">
      <h1>{department.toUpperCase()} Floor Plans</h1>
      <div className="floor-buttons">
        {Object.keys(departmentFloors).map((floor) => (
          <button
            key={floor}
            onClick={() => handleFloorChange(floor)}
            className={selectedFloor === floor ? "active" : ""}
          >
            {floor.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="floor-image">
        <img src={departmentFloors[selectedFloor]} alt={`${selectedFloor}`} />
      </div>
    </div>
  );
};

export default FloorPage;
