import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CountContext from "../../Context";

import PropTypes from "prop-types";
import "./SideBar.css";

import logo from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import logoMobile from "../assets/logo-mobile.svg";

import boardIcon from "../assets/icon-board.svg";
import iconLightTheme from "../assets/icon-light-theme.svg";
import iconDarkTheme from "../assets/icon-dark-theme.svg";
import iconHideSideBar from "../assets/icon-hide-sidebar.svg";
import iconShowSideBar from "../assets/icon-show-sidebar.svg";
import CreateNewBoard from "../../pages/CreateNewBoard/CreateNewBoard";
import DarksMode from "../DarksMode/DarksMode";

const SideBar = ({ children }) => {
  const { boardData, showSideBar, updateShowSideBar } =
    useContext(CountContext);

  const [showNewBoardModal, setNewBoardModal] = useState(false);
  const closeNewBoardModal = () => {
    setNewBoardModal(false);
  };
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("selectedTheme")
  );

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.matchMedia("(max-width: 640px)").matches) {
        updateShowSideBar(false);
      } else {
        console.log("Screen less than 500px");
      }
    });
  }, []);

  const updateThemeState = () => {
    setSelectedTheme(localStorage.getItem("selectedTheme"));
  };

  const toggle = () => {
    updateShowSideBar(!showSideBar);
  };

  const handleModal = () => {
    setNewBoardModal(true);
  };

  return (
    <div className="main-container ">
      <div className={`${showSideBar ? "sidebar" : "no-sidebar"}`}>
        <span>
          <picture>
            <source media="(max-width: 640px )" srcSet={logoMobile} sizes="" />
            <img
              className="logo-section"
              style={{ display: showSideBar ? "block" : "none" }}
              src={
                selectedTheme === "light" || selectedTheme === null
                  ? logo
                  : logoLight
              }
              alt=""
            />
          </picture>
        </span>

        <div className="navigation">
          <div>
            <h1
              style={{ display: showSideBar ? "block" : "none" }}
              className="title"
            >
              {`ALL BOARD (${boardData.boards.length} )`}
            </h1>
            {boardData.boards.map((item, index) => (
              <NavLink
                to={`/boards/${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                key={index}
                style={{ display: showSideBar ? "block" : "none" }}
                className="nav-tabs"
                activeclassname="active"
              >
                <span className="nav-tab__content">
                  {" "}
                  <img className="nav-icon" src={boardIcon} alt="boardIcon" />
                  {item.name.length > 20
                    ? item.name.substring(0, 20) + "..."
                    : item.name}
                </span>
              </NavLink>
            ))}
            <Link
              style={{ display: showSideBar ? "flex" : "none" }}
              className="nav-tabs"
              onClick={handleModal}
            >
              <span className="nav-tab__content add-board-btn">
                <img className="nav-icon" src={boardIcon} alt="boardIcon" />+
                Create New Board
              </span>
            </Link>
          </div>

          {/* HIDE SIDE BAR SECTION */}
          <div className="theme_and_switch">
            <div
              style={{ display: showSideBar ? "flex" : "none" }}
              className="switch"
            >
              <img src={iconLightTheme} alt="Light Theme" />
              {/* <div className="toggler">
                <div className="toggler-btn"></div>
              </div> */}
              <DarksMode updateThemeState={updateThemeState} />

              <img src={iconDarkTheme} alt="Dark Theme" />
            </div>

            {/* HIDE SIDEBAR */}
            <div
              style={{ width: showSideBar ? "245px" : "48px" }}
              className="hideSidebar"
              onClick={toggle}
            >
              <span
                style={{
                  display: showSideBar ? "block" : "none",
                }}
                className="hide-btn"
              >
                {" "}
                <img
                  className="hide-sidebar-icon"
                  src={iconHideSideBar}
                  alt="Hide Sidebar"
                />
                Hide Sidebar
              </span>
              <div
                style={{ display: showSideBar ? "none" : "flex" }}
                className="show-sidebar-btn"
              >
                <img
                  src={iconShowSideBar}
                  alt=""
                  className="show-sidebar-icon inline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>{children}</main>
      <CreateNewBoard
        closeNewBoardModal={closeNewBoardModal}
        visible={showNewBoardModal}
      />
    </div>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
