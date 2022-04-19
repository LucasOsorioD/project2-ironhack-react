import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mytasks from "../components/Mytasks.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// import EditTasks from "./EditTasks.js";

function MyTasks() {
  const [selectedTask, setSelectedTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const [taskObj, setTaskObj] = useState({
    name: "",
  });
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  

  useEffect(() => {
    async function fetchTask() {
      try {
        const responseTask = await axios.get(
          `https://ironrest.herokuapp.com/cardinatortasks/`
        );
        // console.log(responseTask);
        setTaskList([...responseTask.data]);
        setColumns([
          {
            id: uuidv4(),
            name: "Todo",
            items: [...responseTask.data],
          },
          {
            id: uuidv4(),
            name: "Doing",
            items: [],
          },
          {
            id: uuidv4(),
            name: "Done",
            items: [],
          },
        ]);
        setLoading(false);
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
      refreshPage();
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
        refreshPage();
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
  const getListStyle = (isDraggingOver, overflow) => ({
    background: isDraggingOver ? "#cceeff" : "#ebecf1",
    // border: "5px solid #ebecf1",
    // width: 250,
    maxHeight: "60vh",
  });

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(taskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTaskList(items);
  }

  return (
    <>
    {
      loading ? <h1>LOADING</h1>
      :
      <div
        style={{
          display: "flex",
          marginLeft: "12vh",
          marginTop: "12vh",
          justifyContent: "space-around"
        }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {columns.map((column) => {
            return (
              <Card style={{ borderRadius: "0.5rem", width: "21rem" }}>
                <Card.Header className="card-header">
                  <h5 style={{ margin: "0" }}>{column.name}</h5>
                </Card.Header>

                <Card.Body>
                  <Droppable droppableId={column.id} key={column.id}>
                    {(droppableProvided, droppableSnapshot) => (
                      <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        style={getListStyle(
                          droppableSnapshot.isDraggingOver
                          // this.props.overflow
                        )}
                        onScroll={(e) =>
                          console.log(
                            "current scrollTop",
                            e.currentTarget.scrollTop
                          )
                        }
                      >
                        <ul
                          className="list-group "
                          style={{ listStyle: "none", overflowY: "scroll" }}
                        >
                          {column.items?.map((currentTask, index) => (
                            <div key={currentTask._id}>
                              <Draggable
                                key={currentTask._id}
                                draggableId={currentTask._id}
                                index={index}
                              >
                                {(droppableProvided, droppableSnapshot) => (
                                  <div
                                    {...droppableProvided.draggableProps}
                                    {...droppableProvided.dragHandleProps}
                                    ref={droppableProvided.innerRef}
                                  >
                                    <li
                                      className="list-group-item mb-2"
                                      key={currentTask._id}
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
                                      </div>
                                    </li>
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          ))}
                          {droppableProvided.placeholder}
                        </ul>
                      </div>
                    )}
                  </Droppable>
                  {
                    column.name === "Todo" &&
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
                  }
                </Card.Body>
              </Card>
            );
          })}
        </DragDropContext>
      </div>
    }
    </>
  );
}
export default MyTasks;
