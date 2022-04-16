import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import EditTasks from "./EditTasks.js";
import Button from "react-bootstrap/Button";

function MyTasks() {
  const [selectedTask, setSelectedTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const [taskObj, setTaskObj] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const handleShow = (id) => {
    setSelectedTask(id);
    setShowModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    async function fetchTask() {
      try {
        const responseTask = await axios.get(
          `https://ironrest.herokuapp.com/cardinatortasks/`
        );
        console.log(responseTask);
        setTaskList([...responseTask.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTask();
  }, []);

  async function fetchDeletion() {
    try {
      const removeTask = await axios.delete(
        `https://ironrest.herokuapp.com/cardinatortasks/${selectedTask}`
      );
    } catch (err) {
      console.error(err);
    }
    fetchDeletion();
  }

  function handleClick() {
    async function fetchData() {
      try {
        const addNewTask = await axios.post(
          "https://ironrest.herokuapp.com/cardinatortasks/",
          taskObj
        );
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }

  function handleUpdate() {
    async function fetchUpdate() {
      try {
        const updateTask = await axios.put(
          `https://ironrest.herokuapp.com/cardinatortasks/${selectedTask}`,
          taskObj
        );
        refreshPage();
        //  colocar um alert aqui
      } catch (err) {
        console.error(err);
      }
    }
    fetchUpdate();
    handleClose();
  }

  function handleChange(event) {
    setTaskObj({ ...taskObj, [event.target.name]: event.target.value });
  }

  return (
    <div style={{ marginLeft: "12vh", marginTop: "12vh", width: "20rem" }}>
      <Card style={{ borderRadius: "0.5rem" }}>
        <Card.Header
          style={{
            borderTopRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
            paddingTop: "1.5vh",
            paddingBottom: "1.5vh",
          }}
        >
          <h5 style={{ margin: "0" }}>To Do</h5>
        </Card.Header>

        <Card.Body>
          <ul className="list-group " style={{ listStyle: "none" }}>
            {taskList.map((currentTask) => (
              <div key={currentTask._id}>
                <li key={currentTask._id} className="list-group-item mb-2">
                  {currentTask.name}
                  <Button
                    variant="secondary"
                    onClick={() => handleShow(currentTask._id)}
                  ></Button>
                  <input
                    // checked={selectedTask == currentTask._id)}
                    onClick={() => setSelectedTask(currentTask._id)}
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    aria-label="..."
                    style={{ position: "relative", right: "7rem" }}
                  />
                </li>
              </div>
            ))}
          </ul>

          <div>
            <input
              onChange={handleChange}
              value={taskObj.name}
              name="name"
              style={{ marginTop: "0.5rem", width: "18rem" }}
              type="form"
            />

            <div>
              <button
                onClick={() => {
                  handleClick();
                  navigate("/mytasks");
                }}
                style={{ marginRight: "1rem", marginLeft: "8.8rem" }}
                className="btn btn-secondary mt-2"
              >
                Add
              </button>
              <button
                className="btn btn-danger mt-2 "
                onClick={() => {
                  fetchDeletion();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <EditTasks
        show={showModal}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        handleChange={handleChange}
        value={taskObj.name}
        name={"name"}
      />
    </div>
  );
}
export default MyTasks;
