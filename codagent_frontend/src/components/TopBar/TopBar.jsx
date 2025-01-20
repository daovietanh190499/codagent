import React, { useState, useEffect, useRef, useContext } from "react";
import "./TopBar.css";
import logo from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import logoMobile from "../assets/logo-mobile.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import addTaskMobile from "../assets/icon-addtask-mobile.svg";

import iconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import { getGlobalState, setSideBar, useGlobalState } from "../../store/store";
import DeleteBoard from "../../pages/DeleteBoard/DeleteBoard";
import EditBoard from "../../pages/EditBoard/EditBoard";
import AddTask from "../../pages/AddTask/AddTask";
import CountContext from "../../Context";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import MobileSideBar from "../MobileSideBar/MobileSideBar";
import CreateNewBoard from "../../pages/CreateNewBoard/CreateNewBoard";

const TopBar = () => {
  const topBarMenu = useRef();
  const topmenuBtnRef = useRef();
  const [showAddTaskModal, setAddTaskModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const [showNavBar, setShowNavbar] = useState(false);
  const [createNewBoardModal, setCreateNewBoardModal] = useState(false);

  const { boardData, addTaskBtnState, showSideBar, updateShowSideBar } =
    useContext(CountContext);
  const [currentBoard, setCurrentBoard] = useState(
    localStorage.getItem("currentBoard")
  );
  const [navTitle, setNavTitle] = useState("");
  const location = useLocation();
  const boardPosition = boardData.boards.findIndex((item) =>
    item.name
      .toLowerCase()
      .includes(location.pathname.slice(8).replace(/-/g, " ").toLowerCase())
  );
  const [boardColumns, setBoardColumns] = useState(
    boardData.boards[boardPosition]
  );

  // const checkScreenSize = () => {
  //   window.addEventListener("resize", function () {
  //     if (window.matchMedia("(min-width: 640px)").matches) {
  //       console.log("TRUE");
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // };

  useEffect(() => {
    setCurrentBoard(localStorage.getItem("currentBoard"));
    setNavTitle(location.pathname.slice(8).replace(/-/g, " ").toLowerCase());
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (topmenuBtnRef.current?.contains(e.target)) return;
      if (!topBarMenu.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    });
  }, []);

  useEffect(() => {
    const chars = { "/": "", "-": " " };

    const boardPosition = boardData.boards.findIndex((item) =>
      item.name
        .toLowerCase()
        .includes(location.pathname.slice(8).replace(/-/g, " ").toLowerCase())
    );
    setBoardColumns(boardData.boards[boardPosition]);
  }, [location]);

  const closeDeleteBoardModal = () => {
    const el = document.querySelector(".sidebar");
    el ? (el.style.zIndex = "21") : null;
    setShowDeleteBoardModal(false);
  };

  const handleDeleteModal = () => {
    const el = document.querySelector(".sidebar");
    el ? (el.style.zIndex = "20") : null;
    setShowDeleteBoardModal(true);
    setOpenMenu(!openMenu);
  };

  const closeAddTaskdModal = () => {
    const el = document.querySelector(".sidebar");
    el ? (el.style.zIndex = "21") : null;
    setAddTaskModal(false);
  };

  const handleAddTaskModal = () => {
    const el = document.querySelector(".sidebar");
    el ? (el.style.zIndex = "20") : null;
    setAddTaskModal(true);
  };

  const handleMobileSideBar = () => {
    setShowMobileSideBar(true);
  };

  const closeEditBoardModal = () => {
    const el = document.querySelector(".sidebar");
    el ? (el.style.zIndex = "21") : null;
    setShowEditBoardModal(false);
  };

  const closeMobileSideBar = () => {
    setShowMobileSideBar(false);
  };

  const handleEditModal = () => {
    const el = document.querySelector(".sidebar");
    el ? (el.style.zIndex = "20") : null;
    setShowEditBoardModal(true);
    setOpenMenu(!openMenu);
  };

  const openCreateNewBoardModal = () => {
    setCreateNewBoardModal(true);
  };

  const closeNewBoardModal = () => {
    setCreateNewBoardModal(false);
  };

  return (
    <div className="TopBar">
      <div
        style={{ display: showNavBar || showSideBar ? "none" : "flex" }}
        className="rectangle-line"
      ></div>
      <div className="logo-title-region">
        <img
          className="logo-lg-screen hidden sm:flex"
          src={
            localStorage.getItem("selectedTheme") === "light" ? logo : logoLight
          }
          // style={{ display: showNavBar ? "sm:none" : "sm:flex" }}
          alt=""
          srcSet=""
        />
        <img
          className="flex sm:hidden mx-4"
          src={logoMobile}
          alt=""
          srcSet=""
        />
      </div>

      <div className="nav-content">
        <span className="title-span">
          <h1 className="page-title">{navTitle}</h1>
          <h1 onClick={handleMobileSideBar} className="page-title_mobile">
            {navTitle}
          </h1>
          <img className="chevron-icon" src={chevronDown} alt="" />
        </span>

        <div
          style={{ display: location.pathname === "/boards" ? "none" : "flex" }}
          className="add-newtask"
        >
          <span className="left-content-nav">
            <button
              disabled={addTaskBtnState}
              onClick={handleAddTaskModal}
              className="add-task"
              style={{
                backgroundColor: addTaskBtnState ? "#635fc740" : "#635FC7",
              }}
            >
              + Add New Task
            </button>
            <button
              disabled={addTaskBtnState}
              onClick={handleAddTaskModal}
              style={{
                backgroundColor: addTaskBtnState ? "#635fc740" : "#635FC7",
              }}
              className="add-task-mobile"
            >
              +
            </button>
            <img
              className="menu-ellipsis inline cursor-pointer"
              src={iconVerticalEllipsis}
              alt=""
              ref={topmenuBtnRef}
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            />
          </span>

          <div
            ref={topBarMenu}
            className={`dropdown-menu ${openMenu ? "active" : "inactive"}`}
          >
            <ul>
              <li onClick={handleEditModal} className="mb-2 cursor-pointer">
                Edit Board
              </li>
              <li
                onClick={handleDeleteModal}
                className="text-[red] cursor-pointer"
              >
                Delete Board
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AddTask
        visible={showAddTaskModal}
        closeAddTaskModal={closeAddTaskdModal}
      />
      <DeleteBoard
        visible={showDeleteBoardModal}
        closeDeleteBoardModal={closeDeleteBoardModal}
        selectedBoard={boardPosition}
        boardName={boardColumns?.name}
      />

      <EditBoard
        visible={showEditBoardModal}
        closeEditBoardModal={closeEditBoardModal}
        boardColumns={boardColumns}
      />

      <MobileSideBar
        visible={showMobileSideBar}
        closeMobileSideBar={closeMobileSideBar}
        openCreateNewBoardModal={openCreateNewBoardModal}
      />

      <CreateNewBoard
        visible={createNewBoardModal}
        closeMobileSideBar={closeMobileSideBar}
        closeNewBoardModal={closeNewBoardModal}
      />
    </div>
  );
};

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
