import React from "react";
import PropTypes from "prop-types";
import "./DarksModeMobile.css";
const DarksModeMobile = ({ updateThemeStateMob }) => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
    updateThemeStateMob();
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
    updateThemeStateMob();
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkMode();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  return (
    <div className="dark_mode_mobile">
      <input
        className="dark_mode_input_mobile"
        type="checkbox"
        id="darkmode-toggle_mobile"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label
        className="dark_mode_label_mobile"
        htmlFor="darkmode-toggle_mobile"
      ></label>
    </div>
  );
};

DarksModeMobile.propTypes = {};

DarksModeMobile.defaultProps = {};

export default DarksModeMobile;
