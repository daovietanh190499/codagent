import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  isSideBarOpen: { show: true },
  isModalContainerOpen: { show: false },
});

const setSideBar = (show) => {
  console.log(show);
  const isSideBarOpen = getGlobalState("isSideBarOpen");
  setGlobalState("isSideBarOpen", { ...isSideBarOpen, show });
};

const showModal = (show) => {
  const isModalContainerOpen = getGlobalState("isModalContainerOpen");
  setGlobalState("isModalContainerOpen", { ...isModalContainerOpen, show });
};

export {
  setSideBar,
  useGlobalState,
  getGlobalState,
  setGlobalState,
  showModal,
};
