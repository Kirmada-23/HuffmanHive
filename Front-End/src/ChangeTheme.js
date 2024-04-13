import React, { useState, useEffect } from "react";
import "./ChangeTheme.css"; // Import a CSS file for styling

const paintLogo = "/theme.png";

function ChangeTheme() {
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(
    parseInt(localStorage.getItem("imageconverter-theme-index")) || 0
  );

  useEffect(() => {
    localStorage.setItem("imageconverter-theme-index", selectedThemeIndex);
    applyThemeBackground(selectedThemeIndex);
  }, [selectedThemeIndex]);

  const applyThemeBackground = (themeIndex) => {
    let backgroundColor;
    switch (themeIndex) {
      case 0:
        backgroundColor = "#003060"; // Semi-Dark Theme
        break;
      default:
        backgroundColor = "#ffffff"; // Normal Theme
    }
    document.body.style.backgroundColor = backgroundColor;
  };

  const changeTheme = () => {
    const nextThemeIndex = selectedThemeIndex === 0 ? 1 : 0; // Toggles between semi-dark and normal themes
    setSelectedThemeIndex(nextThemeIndex);
  };

  return (
    <div>
      {/* Change theme button with paint logo */}
      <button className="change-theme-button" onClick={() => changeTheme()}>
        <img
          src={paintLogo}
          alt="Paint Logo"
          className="paint-logo"
          style={{ filter: selectedThemeIndex === 0 ? "invert(1)" : "none" }}
        />
      </button>
    </div>
  );
}

export default ChangeTheme;
