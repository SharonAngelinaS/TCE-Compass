// src/pages/ExploreTceMap.jsx
import React from "react";
import "../styles/ExploreTceMap.css"; // Ensure you have any necessary CSS imported

const ExploreTceMap = () => {
  return (
    <>
      <address id="address">
        TCE Compass <br />
        <br />
        Thiagarajar College of Engineering
      </address>
      <div className="responsive-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.1371169697977!2d78.08155289999999!3d9.882132100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c58f98cfb84d%3A0x29f51efea3e84bf2!2sThiagarajar%20College%20of%20Engineering!5e1!3m2!1sen!2sin!4v1733056092163!5m2!1sen!2sin"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ExploreTceMap;
