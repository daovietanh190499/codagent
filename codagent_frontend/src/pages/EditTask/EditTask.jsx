import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./EditTask.css";
import removeSubtask from "../../components/assets/icon-cross.svg";
import CountContext from "../../Context";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTask = ({ selectedTask, visible, closeEditModal, subtasks }) => {
  const [formValues, setFormValues] = useState(selectedTask);
  const [formSubtasks, setFormSubtasks] = useState(subtasks);
  const { boardData, updateAppData } = useContext(CountContext);
  const location = useLocation();
  const chars = { "/": "", "-": " " };
  const navigate = useNavigate();

  useEffect(() => {
    setFormValues(selectedTask);
    setFormSubtasks(subtasks);
  }, [selectedTask]);

  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") closeEditModal();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubtaskUpdate = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...formSubtasks];
    onChangeVal[i][name] = value;
    setFormSubtasks(onChangeVal);
  };

  const deleteSubtask = (e, i) => {
    e.preventDefault();
    const deleteVal = [...formSubtasks];
    deleteVal.splice(i, 1);
    setFormSubtasks(deleteVal);
  };

  const addSubtask = () => {
    setFormSubtasks([...formSubtasks, { title: "", isCompleted: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValues.subtasks = formSubtasks;
    let formData = { ...boardData };

    const boardPosition = formData.boards.findIndex((item) =>
      item.name
        .toLowerCase()
        .includes(location.pathname.slice(8).replace(/-/g, " ").toLowerCase())
    );

    const previousTaskColumn = formData.boards[boardPosition][
      "columns"
    ].findIndex((item) =>
      item.name.toLowerCase().includes(selectedTask.status.toLowerCase())
    );

    const taskPosition = formData.boards[boardPosition]["columns"][
      previousTaskColumn
    ]["tasks"].findIndex((item) =>
      item.title.toLowerCase().includes(selectedTask.title.toLowerCase())
    );

    const newTaskColumn = formData.boards[boardPosition]["columns"].findIndex(
      (item) =>
        item.name.toLowerCase().includes(formValues.status.toLowerCase())
    );

    if (previousTaskColumn === newTaskColumn) {
      const removedTask = formData.boards[boardPosition]["columns"][
        previousTaskColumn
      ]["tasks"].splice(taskPosition, 1, formValues);
    } else {
      const removedTask = formData.boards[boardPosition]["columns"][
        previousTaskColumn
      ]["tasks"].splice(taskPosition, 1);

      formData["boards"][boardPosition]["columns"][newTaskColumn]["tasks"].push(
        formValues
      );
    }

    updateAppData(formData);
    closeEditModal();
    navigate(`${location.pathname}`);
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
          <section className="EditTask">
            <h4 className="form-title">Edit Task</h4>
            <form onSubmit={handleSubmit} action="">
              <fieldset>
                <label htmlFor="">
                  <span className="inputName">Title</span>
                  <input
                    className=""
                    placeholder="e.g. Take coffee break"
                    type="text"
                    required
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                  />
                  {/* <span className="formErrors">{selectedTask.title}</span> */}
                </label>

                <label htmlFor="">
                  <span className="inputName">Description</span>
                  <textarea
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little"
                    name="description"
                    id=""
                    cols="30"
                    rows="3"
                    value={formValues.description}
                    onChange={handleChange}
                  ></textarea>
                  {/* <span className="formErrors">{selectedTask.description}</span> */}
                </label>

                <div className="add-subtask-section">
                  <span className="inputName">Subtasks</span>
                  {formSubtasks.map((subtask, index) => (
                    <label key={index} htmlFor="">
                      <input
                        className=""
                        placeholder="e.g. Make coffee"
                        type="text"
                        name="title"
                        required
                        value={subtask?.title}
                        onChange={(e) => handleSubtaskUpdate(e, index)}
                      />
                      <button
                        onClick={(e) => deleteSubtask(e, index)}
                        className="remove-subtask-btn"
                      >
                        <img src={removeSubtask} alt="" />
                      </button>
                    </label>
                  ))}

                  {/* <span className="formErrors">{formErrors.subtask}</span> */}
                </div>
                <div
                  onClick={addSubtask}
                  className="add-new-task-btn add-column-btn"
                >
                  +Add New Subtask
                </div>

                <div className="current-status">
                  <span className="inputName">Status</span>
                  <label htmlFor="">
                    <select
                      value={formValues.status}
                      onChange={handleChange}
                      name="status"
                      required
                      id="status"
                    >
                      <option value="Todo">Todo</option>
                      <option value="Doing">Doing</option>
                      <option value="Done">Done</option>
                    </select>
                  </label>
                </div>

                <button
                  onClick={(e) => handleOnClose(e)}
                  id="create-task-btn"
                  className="create-task"
                >
                  Save Changes
                </button>
              </fieldset>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

EditTask.propTypes = {};

EditTask.defaultProps = {};

export default EditTask;
