import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import EditTasks from "./EditTasks.js";

function MyTasks() {
  const [selectedTask, setSelectedTask] = useState();
  const [taskList, setTaskList] = useState([]);
  // const [columns, setColumns] = useState(taskColumns);
  const [taskObj, setTaskObj] = useState({
    name: "",
  });
  const navigate = useNavigate();

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
      );refreshPage();
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
        );refreshPage();
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }

  function handleChange(event) {
    setTaskObj({ ...taskObj, [event.target.name]: event.target.value });
  }
  function refreshPage() {
    window.location.reload(false);
  }

  // function handleOnDragEnd(result){
  //   const items = Array.from(taskList);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.detination.index, 0, reorderedItem);
  //   setTaskList(items)
  // }
  // const taskColumns = {
  //   [uuid()]: {
  //     name: "To do",
  //     items: taskList,
  //   },
  //   [uuid()]: {
  //     name: "Doing",
  //     items: [],
  //   },
  //   [uuid()]: {
  //     name: "Done",
  //     items: [],
  //   },
  // };
 
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
          <DragDropContext>
            {/* <DragDropContext onDragEnd={result => ondragend(result, columns, setColumn)}> */}
            <Droppable droppableId="toDo">
              {(provider) => (
                <div
                  onScroll={(e) =>
                    // eslint-disable-next-line no-console
                    console.log("current scrollTop", e.currentTarget.scrollTop)
                  }
                >
                  <ul
                    className="list-group "
                    {...provider.droppableProps}
                    ref={provider.innerRef}
                    style={{ listStyle: "none", overflowY: "scroll" }}
                  >
                    {taskList.map((currentTask, index) => (
                      <div>
                        <Draggable
                          key={currentTask._id}
                          draggableId={currentTask._id}
                          index={index}
                        >
                          {(provider) => (
                            <div>
                              <li
                                {...provider.draggableProps}
                                {...provider.dragHandleProps}
                                ref={provider.innerRef}
                                className="list-group-item mb-2"
                              >
                                {currentTask.name}
                                <div style={{ display: "inline-flex" }}>
                                  <input
                                    onClick={() =>
                                      setSelectedTask(currentTask._id)
                                    }
                                    className="form-check-input me-1"
                                    type="checkbox"
                                    value=""
                                    aria-label="..."
                                    style={{
                                      position: "relative",
                                      right: "7rem",
                                    }}
                                  />
                                  {/* <EditTasks /> */}
                                </div>
                              </li>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    ))}
                    {provider.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          </DragDropContext>

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
    </div>
  );
}
export default MyTasks;

  
 
    
