import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", text: userInput }]);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        userInput,
      });

      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setUserInput(""); // Clear input field
    }
  };

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className="chatbot-button" onClick={toggleChatbot}>
        Chat
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Locas</span>
            <button className="close-btn" onClick={toggleChatbot}>
              X
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={msg.role === "user" ? "user-message" : "bot-message"}
                >
                  {msg.text}
                </div>
              ))}
              {loading && <div className="loader">Loading...</div>}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your message"
                className="chat-input"
              />
              <button type="submit" className="send-btn">Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
