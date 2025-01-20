import { createContext, useContext, useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import PlatformLaunch from "./pages/PlatformLaunch/PlatformLaunch";
import SideBar from "./components/SideBar/SideBar";
import CountContext from "./Context";
import CreateNewBoardComp from "./pages/CreateNewBoardComp/CreateNewBoardComp";

function App() {
  const [boardData, setAppBoardData] = useState(
    JSON.parse(localStorage.getItem("BoardData"))
  );

  const [addTaskBtnState, setAddTaskBtnState] = useState(true);
  const [showSideBar, setShowSideBar] = useState(true);

  const updateAppData = (data) => {
    setAppBoardData(data);
  };

  const updateDateAddTaskBtn = (value) => {
    setAddTaskBtnState(value);
  };

  const updateShowSideBar = (value) => {
    setShowSideBar(value);
    const el = document.querySelector(".tasks-container");
    const navEl = document.querySelector(".nav-content");

    if (!value) {
      el.style.marginLeft = "0px";
      navEl.style.marginLeft = "0px";
    } else if (value) {
      el.style.marginLeft = "20rem";
      navEl.style.marginLeft = "7rem";
    }
  };

  useEffect(() => {
    localStorage.setItem("BoardData", JSON.stringify(boardData));
  }, [boardData]);

  return (
    <CountContext.Provider
      value={{
        boardData,
        updateAppData,
        addTaskBtnState,
        updateDateAddTaskBtn,
        showSideBar,
        updateShowSideBar,
      }}
    >
      <SideBar>
        <div className="">
          <div className="gradient-bg-hero">
            {/* <SideBar /> */}
            <TopBar />

            <Routes>
              <Route path="/boards" element={<CreateNewBoardComp />} />
              <Route
                path="/"
                element={
                  <Navigate to="/boards/platform-launch" replace={true} />
                }
              ></Route>
              <Route
                path="/boards/create-new-board"
                element={<CreateNewBoardComp />}
              />
              <Route path="/boards/:boardName" element={<PlatformLaunch />} />

              {/* <Route path="/marketing-plan" element={<MarketingPlan />} />
              <Route path="/roadmap" element={<RoadMap />} /> */}
            </Routes>
          </div>
        </div>
      </SideBar>
    </CountContext.Provider>
  );
}

export default App;
