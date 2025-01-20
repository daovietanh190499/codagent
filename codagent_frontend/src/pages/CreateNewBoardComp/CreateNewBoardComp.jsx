import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CreateNewBoardComp.css";
import CreateNewBoard from "../CreateNewBoard/CreateNewBoard";

const CreateNewBoardComp = () => {
  const closeNewBoardModal = () => {
    setNewBoardModal(false);
  };
  const [showNewBoardModal, setNewBoardModal] = useState(false);

  const handleModal = () => {
    setNewBoardModal(true);
  };

  return (
    <div className="CreateNewBoardComp">
      <div
        className="default-content"
        // style={{
        //   display:
        //     boardData.boards?.boardPosition?.columns?.length == 0 ||
        //     boardData["boards"].length == 0
        //       ? "flex"
        //       : "none",
        // }}
      >
        <h3 className="empty-message">
          No board exists! <br /> Create a new board to get started.
        </h3>
        <button onClick={handleModal} className="add-column-btn">
          +Create New Board
        </button>
      </div>

      <CreateNewBoard
        closeNewBoardModal={closeNewBoardModal}
        visible={showNewBoardModal}
      />
    </div>
  );
};

CreateNewBoardComp.propTypes = {};

CreateNewBoardComp.defaultProps = {};

export default CreateNewBoardComp;
