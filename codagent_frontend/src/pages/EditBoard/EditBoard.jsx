import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./EditBoard.css";
import removeSubtask from "../../components/assets/icon-cross.svg";
import CountContext from "../../Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditBoard = ({ visible, closeEditBoardModal, boardColumns }) => {
  const { boardData, updateAppData } = useContext(CountContext);
  const [columns, setColumns] = useState(boardColumns?.columns);
  const [name, setName] = useState(boardColumns?.name);
  const navigate = useNavigate();

  useEffect(() => {
    setColumns(boardColumns?.columns);
    setName(boardColumns?.name);
  }, [boardColumns]);

  const handleBoardName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleColumn = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...columns];
    onChangeVal[i][name] = value;
    setColumns(onChangeVal);
  };

  const deleteColumn = (e, i) => {
    e.preventDefault();
    const deleteVal = [...columns];
    deleteVal.splice(i, 1);
    setColumns(deleteVal);
  };

  const addColumn = () => {
    setColumns([...columns, { name: "", tasks: [] }]);
  };

  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") closeEditBoardModal();
  };

  const handleSubmit = (e) => {
    const chars = { "/": "", "-": " " };
    e.preventDefault();
    const formValues = { name: "", columns: [] };
    formValues.name = name;

    formValues.columns = [...columns];

    let formData = { ...boardData };

    const boardPosition = formData.boards.findIndex((item) =>
      item.name
        .toLowerCase()
        .includes(location.pathname.slice(8).replace(/-/g, " ").toLowerCase())
    );

    formData["boards"][boardPosition] = formValues;
    navigate(`/boards/${name.replace(/\s+/g, "-").toLowerCase()}`);
    updateAppData(formData);
    closeEditBoardModal();
  };

  if (!visible) return null;
  return (
    <div
      onClick={handleOnClose}
      id="modal-container"
      className="ModalContainer"
    >
      <section className="modal-container-modal">
        <div className="modal-body">
          <section className="EditBoard">
            <h4 className="form-title">Edit Board</h4>
            <form onSubmit={handleSubmit} action="">
              <fieldset>
                <label className="first-label" htmlFor="">
                  <span className="inputName">Board Name</span>
                  <input
                    className=""
                    placeholder="e.g. Web Design"
                    type="text"
                    required
                    name="board"
                    value={name}
                    onChange={handleBoardName}
                  />
                  {/* <span className="formErrors">{selectedTask.title}</span> */}
                </label>

                <div className="add-subtask-section">
                  <span className="inputName">Board Columns</span>
                  {columns?.map((item, index) => (
                    <label key={index} htmlFor="">
                      <input
                        className=""
                        placeholder="e.g. Todo"
                        type="text"
                        name="name"
                        required
                        value={item.name}
                        onChange={(e) => handleColumn(e, index)}
                      />
                      <button
                        onClick={(e) => deleteColumn(e, index)}
                        className="remove-subtask-btn"
                      >
                        <img src={removeSubtask} alt="" />
                      </button>
                    </label>
                  ))}

                  {/* <span className="formErrors">{formErrors.subtask}</span> */}
                </div>
                <div onClick={addColumn} className="btn add-column-btn mb-6">
                  +Add New Column
                </div>

                <button className="btn save-btn">Save Changes</button>
              </fieldset>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

EditBoard.propTypes = {};

EditBoard.defaultProps = {};

export default EditBoard;
