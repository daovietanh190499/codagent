import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import "./ViewTask.css";
import iconVerticalEllipsis from "../../components/assets/icon-vertical-ellipsis.svg";
import EditTask from "../EditTask/EditTask";
import CountContext from "../../Context";

const ViewTask = ({
  selectedTask,
  visible,
  closeViewTaskModal,
  showEditTask,
  showDeleteTask,
  subtasks,
}) => {
  console.log(subtasks);
  const menuRef = useRef();
  const menuBtnRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const { boardData, updateAppData } = useContext(CountContext);
  const [subtaskStatus, setSubtaskStatus] = useState([...subtasks]);
  const [formValues, setFormValues] = useState({ ...selectedTask });
  const [status, setStatus] = useState(selectedTask.status);
  const chars = { "/": "", "-": " " };

  useEffect(() => {
    setFormValues(selectedTask);
    setSubtaskStatus(subtasks);
    setStatus(selectedTask.status);

    const handler = (e) => {
      if (menuBtnRef.current?.contains(e.target)) return;
      if (!menuRef.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, [selectedTask, subtaskStatus]);

  const openEditModal = () => {
    showEditTask();
  };

  const openDeleteTask = () => {
    showDeleteTask();
  };

  const handleCheck = (id) => {
    const position = id;
    setSubtaskStatus((prev) => {
      return prev.map((item, index) => {
        if (index === id) {
          return { ...item, isCompleted: !item.isCompleted };
        } else {
          return { ...item };
        }
      });
    });

    formValues.subtasks = subtaskStatus;
    let formData = { ...boardData };
    const boardPosition = formData.boards.findIndex((item) =>
      item.name
        .toLowerCase()
        .includes(location.pathname.slice(8).replace(/-/g, " ").toLowerCase())
    );
    const taskColumn = formData.boards[boardPosition]["columns"].findIndex(
      (item) =>
        item.name.toLowerCase().includes(formValues.status.toLowerCase())
    );

    formData["boards"][boardPosition]["columns"][taskColumn]["tasks"].forEach(
      (el, index) => {
        if (el.title === formValues.title) {
          el.subtasks.map((item, index) => {
            if (index === position) {
              console.log(item);
              item.isCompleted = !item.isCompleted;
            } else {
              return { ...item };
            }
          });
        }
      }
    );

    updateAppData(formData);
    console.log(formData);
  };

  const handleSelect = (e) => {
    let formData = { ...boardData };

    const boardPosition = formData.boards.findIndex((item) =>
      item.name
        .toLowerCase()
        .includes(location.pathname.slice(8).replace(/-/g, " ").toLowerCase())
    );

    const previousTaskColumn = formData.boards[boardPosition][
      "columns"
    ].findIndex((item) =>
      item.name.toLowerCase().includes(status.toLowerCase())
    );

    const { name, value } = e.target;
    setStatus(value);

    const newTaskColumn = formData.boards[boardPosition]["columns"].findIndex(
      (item) => item.name.toLowerCase().includes(value.toLowerCase())
    );

    const taskPosition = formData.boards[boardPosition]["columns"][
      previousTaskColumn
    ]["tasks"].findIndex((item) =>
      item.title.toLowerCase().includes(formValues.title.toLowerCase())
    );

    const removedTask = formData.boards[boardPosition]["columns"][
      previousTaskColumn
    ]["tasks"].splice(taskPosition, 1);

    removedTask[0].status = value;

    formData["boards"][boardPosition]["columns"][newTaskColumn]["tasks"].push(
      removedTask[0]
    );

    updateAppData(formData);
  };

  // const el = formData["boards"][boardPosition]["columns"][taskColumn][
  //   "tasks"
  // ].filter((item) => item.title === formValues.title);

  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") closeViewTaskModal();
  };
  const count = subtaskStatus.filter((subtask, index) => {
    return subtask["isCompleted"] === true;
  }).length;

  return (
    <div
      onClick={handleOnClose}
      id="modal-container"
      className="ModalContainer"
    >
      <section className="modal-container-modal">
        <div className="modal-body">
          <section className="ViewTask-Modal">
            <form action="">
              <fieldset>
                <div className="view_task-title">
                  <h4 className="form-title">{formValues.title}</h4>

                  <img
                    className="menu-ellipsis inline cursor-pointer"
                    src={iconVerticalEllipsis}
                    alt=""
                    ref={menuBtnRef}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  />
                  <div
                    ref={menuRef}
                    className={`dropdown-menu ${
                      openMenu ? "active" : "inactive"
                    }`}
                  >
                    <ul>
                      <li
                        onClick={openEditModal}
                        className="mb-2 cursor-pointer"
                      >
                        Edit Task
                      </li>
                      <li
                        onClick={openDeleteTask}
                        className="text-[red] cursor-pointer"
                      >
                        Delete Task
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="task-description">{formValues.description}</p>

                <div className="sub-tasks">
                  <span className="number-of-tasks inputName">
                    {"Subtask " +
                      "( " +
                      count +
                      " of " +
                      subtaskStatus.length +
                      " )"}
                  </span>
                  {subtaskStatus.map((subtask, index) => {
                    return (
                      <label
                        onClick={() => handleCheck(index)}
                        key={index}
                        htmlFor=""
                        // className="subtask-name"
                        className={`subtask-name ${
                          subtask.isCompleted ? "completed" : "incomplete"
                        }
                        `}
                      >
                        <input
                          checked={subtask.isCompleted}
                          readOnly
                          type="checkbox"
                          name=""
                          id=""
                        />
                        <span
                          style={{
                            textDecorationLine: subtask.isCompleted
                              ? "line-through"
                              : "none",
                          }}
                          className="inputName"
                        >
                          {subtask.title}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="current-status">
                  <span className="inputName"> Current Status</span>
                  <label htmlFor="">
                    <select
                      onChange={handleSelect}
                      value={status}
                      name="status"
                      id="status"
                    >
                      <option value="Todo">Todo</option>
                      <option value="Doing">Doing</option>
                      <option value="Done">Done</option>
                    </select>
                  </label>
                </div>
              </fieldset>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

ViewTask.propTypes = {};

ViewTask.defaultProps = {};

export default ViewTask;
