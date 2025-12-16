import React from "react";
import "./headerIcons.css";

const HeaderIcons = () => {
  return (
    <header className="hi-header">
      
      {/* LEFT: Logo */}
      <div className="hi-logo">
        <svg
          className="hi-logo-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0B9A8C"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3L3 10L10 21L21 14L15 3H8Z" />
        </svg>

        <span className="hi-logo-text">BotrixAI</span>
      </div>

      {/* RIGHT: Icons */}
      <div className="hi-icons">
        
        {/* History Icon */}
        <button className="hi-icon-btn" aria-label="History">
          <svg 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="none" 
            stroke="black" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
        </button>

        {/* Avatar */}
        <div className="hi-avatar">
          S
        </div>
      </div>

    </header>
  );
};

export default HeaderIcons;
