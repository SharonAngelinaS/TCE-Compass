import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import DepartmentFloorPage from "./pages/DepartmentFloorPage";
import ExploreTceMap from "./pages/ExploreTceMap";
import Chatbot from "./components/Chatbot";

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Chatbot />} {/* Chatbot visible except on Welcome Page */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/floor/:department" element={<DepartmentFloorPage />} />
        <Route path="/explore-tce-map" element={<ExploreTceMap />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
