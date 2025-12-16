import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FiRotateCcw } from "react-icons/fi";
import Botrix from "../assets/botrix-logo2.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar-main">
      {/* Left Logo & Name */}
      <div className="navbar-left">
        <img src={Botrix} alt="logo" className="nav-logo" />
        <h2 className="nav-title">BotrixAI</h2>
      </div>

      {/* Right Icons */}
      <div className="navbar-right">
        <FiRotateCcw className="nav-icon" onClick={() => navigate("/history")} />

        {/* Profile Circle */}
        <div className="nav-profile" onClick={() => navigate("/signin")}>
          <span>S</span>
        </div>
      </div>
    </div>
  );
}
