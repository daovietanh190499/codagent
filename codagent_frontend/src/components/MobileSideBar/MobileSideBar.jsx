import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MobileSideBar.css";
import CountContext from "../../Context";
import { Link, NavLink, useLocation } from "react-router-dom";

import boardIcon from "../assets/icon-board.svg";
import iconLightTheme from "../assets/icon-light-theme.svg";
import iconDarkTheme from "../assets/icon-dark-theme.svg";
import DarksModeMobile from "../DarksModeMobile/DarksModeMobile";

const MobileSideBar = ({
  visible,
  closeMobileSideBar,
  openCreateNewBoardModal,
}) => {
  const location = useLocation();
  const { boardData } = useContext(CountContext);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("selectedTheme")
  );

  useEffect(() => {
    closeMobileSideBar();
  }, [location]);

  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") closeMobileSideBar();
  };

  const updateThemeStateMob = () => {
    setSelectedTheme(localStorage.getItem("selectedTheme"));
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setSideBar(!isOpen);
  };

  const handleCreateNewBoardModal = () => {
    closeMobileSideBar();
    openCreateNewBoardModal();
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleOnClose}
      id="modal-container"
      className="ModalContainer_mobile"
    >
      <section className="modal-container-modal">
        <div className="modal-body">
          <div className="MobileSideBar">
            <div className="navigation">
              <div>
                <h1 className="title">
                  {`ALL BOARD (${boardData.boards.length})`}
                </h1>
                {boardData.boards.map((item, index) => (
                  <NavLink
                    to={`/boards/${item.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    key={index}
                    className="nav-tabs_mobile"
                    activeclassname="active_mobile"
                  >
                    <span className="nav-tab__content_mobile">
                      {" "}
                      <img
                        className="nav-icon_mobile inline"
                        src={boardIcon}
                        alt="boardIcon"
                      />
                      {item.name.length > 20
                        ? item.name.substring(0, 20) + "..."
                        : item.name}
                    </span>
                  </NavLink>
                ))}
                <Link className="nav-tabs" onClick={handleCreateNewBoardModal}>
                  <span className="nav-tab__content_mobile add-board-btn">
                    <img className="nav-icon" src={boardIcon} alt="boardIcon" />
                    + Create New Board
                  </span>
                </Link>
              </div>

              <div className="theme_and_switch_mobile">
                <div className="switch_mobile">
                  <img src={iconLightTheme} alt="Light Theme" />

                  <DarksModeMobile updateThemeStateMob={updateThemeStateMob} />

                  <img src={iconDarkTheme} alt="Dark Theme" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

MobileSideBar.propTypes = {};

MobileSideBar.defaultProps = {};

export default MobileSideBar;
