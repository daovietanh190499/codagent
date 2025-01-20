import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./CreateNewBoard.css";
import removeSubtask from "../../components/assets/icon-cross.svg";
import CountContext from "../../Context";
import { Navigate, useNavigate } from "react-router-dom";

const CreateNewBoard = ({ visible, closeNewBoardModal }) => {
  const { boardData, updateAppData } = useContext(CountContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [columns, setColumns] = useState([
    {
      name: "",
      tasks: [],
    },
    {
      name: "",
      tasks: [],
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = { name: "", columns: [] };
    formValues.name = name;
    formValues.columns = [...columns];

    let formData = { ...boardData };
    formData["boards"].push(formValues);
    updateAppData(formData);
    navigate(`/boards/${name.replace(/\s+/g, "-").toLowerCase()}`);
    closeNewBoardModal();
    setName("");
    setColumns([
      {
        name: "",
        tasks: [],
      },
      {
        name: "",
        tasks: [],
      },
    ]);
    console.log(formData);
  };

  const handleBoardName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleColumn = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...columns];
    console.log(onChangeVal);
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
    if (e.target.id === "modal-container") closeNewBoardModal();
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
          <section className="CreateNewBoard">
            <h4 className="form-title">Add New Board</h4>
            <form onSubmit={handleSubmit} action="">
              <fieldset>
                <label className="first-label" htmlFor="">
                  <span className="inputName">Name</span>
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
                  <span className="inputName">Columns</span>
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

CreateNewBoard.propTypes = {};

CreateNewBoard.defaultProps = {};

export default CreateNewBoard;
