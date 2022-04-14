import { DragDropContext } from "react-beautiful-dnd";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function MyTasks() {
  const [selectedTask, setSelectedTask] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  // const {_id} = useParams();

  const [taskObj, setTaskObj] = useState([
    {
      name: "",
      status: "",
      projectId: "",
      created_at: ""
    }
  ]);
  //name vai ser o valor inserido no input
  //status atualizado no kanban
  //project id-> pegar pela rota
  //data para ordenar no kanban

  useEffect(() => {
    async function fetchTask() {
      try {
        const responseTask = await axios.get(
          `https://ironrest.herokuapp.com/cardinatortasks/`
        );
        console.log(responseTask);
        setTaskObj([...responseTask.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTask();
  }, []);

  // function deleteItems(task) {
  //   // const clone = taskObj.filter((task) => !task.includes(task._id));
  //   // setTaskObj(clone);
    
  // }

  // function deleteTasks(){
  //   fetchDeletion()
  // }

  
    async function fetchDeletion() {
      try {
        const removeTask = await axios.delete(
          `https://ironrest.herokuapp.com/cardinatortasks/${selectedTask}`
          );
          setTaskObj([...removeTask.data]);
        } catch (err) {
          console.error(err);
        }
      }
      fetchDeletion();

      // console.log({_id})

  function selectItems(_id) {
    const clone = [...taskObj];

    const index = clone.indexOf(_id);

    if (index > -1) {
      clone.splice(index, 1);
    } else {
      clone.push(_id);
    }
    
    console.log(index);
    //setSelectedTask(clone)
    setSelectedTask(_id);
  }
  console.log(selectedTask);

  function handleClick() {
    // if (newTask.length > 0) {
      // const clone = [...taskObj]
      // clone.push(newTask)
      // setTaskObj(clone)

      // setNewTask("");
      async function fetchData() {
        try {
          const addNewTask = await axios.post(
            `https://ironrest.herokuapp.com/cardinatortasks/`
          );
          setTaskObj([...addNewTask.data]);  
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }
  
  function handleChange(event) {
    setNewTask(event.target.value);
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
            {taskObj.map((currentTask) => (
              <div key={currentTask._id}>
                <li key={currentTask._id} className="list-group-item mb-2">
                  {currentTask.name}
                  <input
                    defaultChecked={selectedTask.includes(currentTask._id)}
                    onClick={() => selectItems(currentTask._id)}
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
              onClick={handleChange}
              // value={}
              style={{ marginTop: "0.5rem", width: "18rem" }}
              type="form"
            />
            <div>
              <button
                onClick={handleClick}
                style={{ marginRight: "1rem", marginLeft: "8.8rem" }}
                className="btn btn-secondary mt-2"
              >
                Add
              </button>
              <button onClick={fetchDeletion} className="btn btn-danger mt-2 ">
                Delete
              </button>
            </div>
          </div>
        </Card.Body>
        {/* ); */}
      </Card>
    </div>
  );
}
export default MyTasks;
