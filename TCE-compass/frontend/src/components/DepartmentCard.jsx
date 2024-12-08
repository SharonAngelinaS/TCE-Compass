import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DepartmentCard.css";

function DepartmentCard({ department }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/floor/${department.toLowerCase()}`);
  };

  return (
    <div className="department-card" onClick={handleClick}>
      <h3>{department}</h3>
    </div>
  );
}

export default DepartmentCard;
