import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Style file for Navbar

// Hardcoded data for departments
const departmentData = [
    { room: "ITT1", department: "CSBS", floor: "IT 3rd floor" },
    { room: "ITT2", department: "CSBS", floor: "IT 3rd floor" },
    { room: "ITT3", department: "CSBS", floor: "IT 3rd floor" },
    { room: "ITT4", department: "CSBS", floor: "IT 3rd floor" },
    { room: "Agile lab", department: "CSBS", floor: "IT 3rd floor" },
    { room: "Block chain lab", department: "CSBS", floor: "IT 3rd floor" },
    { room: "IBA lab", department: "CSBS", floor: "IT 3rd floor" },
    { room: "SSE lab", department: "CSBS", floor: "IT ground floor" },
    { room: "IG1", department: "IT", floor: "IT ground floor" },
    { room: "IG2", department: "IT", floor: "IT ground floor" },
    { room: "IG3", department: "IT", floor: "IT ground floor" },
    { room: "IG4", department: "IT", floor: "IT ground floor" },
    { room: "IG5", department: "IT", floor: "IT ground floor" },
    { room: "IG6", department: "IT", floor: "IT ground floor" },
    { room: "IG7", department: "IT", floor: "IT ground floor" },
    { room: "IG8", department: "IT", floor: "IT ground floor" },
    { room: "Data Science lab", department: "IT", floor: "IT ground floor" },
    { room: "IF1", department: "IT", floor: "IT first floor" },
    { room: "IF2", department: "IT", floor: "IT first floor" },
    { room: "IF3", department: "IT", floor: "IT first floor" },
    { room: "IF4", department: "IT", floor: "IT first floor" },
    { room: "Cognitive Science lab", department: "IT", floor: "IT first floor" },
    { room: "Cyber Forensic Lab", department: "IT", floor: "IT first floor" },
    { room: "Honeywell IOT Product Development lab", department: "IT", floor: "IT first floor" },
    { room: "Motorola-Enterprise Mobility lab", department: "IT", floor: "IT first floor" },
    { room: "IS1", department: "IT", floor: "IT second floor" },
    { room: "IS2", department: "IT", floor: "IT second floor" },
    { room: "IS3", department: "IT", floor: "IT second floor" },
    { room: "IS4", department: "IT", floor: "IT second floor" },
    { room: "IS5", department: "IT", floor: "IT second floor" },
    { room: "Mobile Application Development lab", department: "IT", floor: "IT second floor" },
    { room: "Data Analytics lab", department: "IT", floor: "IT second floor" },
    { room: "Business Analytics lab", department: "IT", floor: "IT second floor" },
  
];
const Navbar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const navigate = useNavigate(); // For page navigation
  
    const handleSearch = (event) => {
      event.preventDefault(); // Prevent page reload on form submit
  
      // Filter search results
      const filteredResults = departmentData.filter((item) =>
        item.room.toLowerCase().includes(query.toLowerCase())
      );
  
      if (filteredResults.length > 0) {
        setResults(filteredResults[0]);
      } else {
        setResults(null);
        alert("No matching room or lab found!");
      }
    };
  
    const handleExploreMap = () => {
      // Navigate to the map page
      navigate("/explore-tce-map");
    };
  
    return (
      <div className="navbar">
        <div className="brand-title">TCE Compass</div>
  
        {/* Search form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for classrooms or labs..."
            className="search-bar"
          />
          <button
            type="button" // Prevent form submit on button click
            className="search-button"
            onClick={() => {
              if (query.trim()) {
                handleSearch(new Event("submit")); // Trigger search
              } else {
                handleExploreMap(); // Navigate if no query
              }
            }}
          >
            Explore TCE Map
          </button>
        </form>
  
        {/* Modal for search results */}
        {results && (
          <div className="modal">
            <div className="modal-content">
              <h2>Search Results</h2>
              <p>
                <strong>Room:</strong> {results.room}
              </p>
              <p>
                <strong>Department:</strong> {results.department}
              </p>
              <p>
                <strong>Floor:</strong> {results.floor}
              </p>
              <button
                onClick={() => setResults(null)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Navbar;