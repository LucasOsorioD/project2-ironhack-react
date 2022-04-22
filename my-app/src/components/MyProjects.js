import Card from "react-bootstrap/Card";
import Charts from "./Charts";
import Chart from "chart.js/auto";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Graph from "./Graph";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditProject from "./EditProject";
import MyTasks from "./MyTasks";
// import {
//   taskFilteredByProject,
//   tasksFilteredByStatus,
//   calculandoWorkProgress,
// } from "./testandoReactComFlah";
function taskFilteredByProject(taskList, projectId) {
  return taskList.filter((task) => task.projectId === projectId);
}

function tasksFilteredByStatus(taskList, status) {
  return taskList.filter((task) => task.status === status);
}

function calculandoWorkProgress(
  listaFiltradaPorProjeto,
  tarefasFiltradasPorStatusDone
) {
  return `${Math.round(
    (tarefasFiltradasPorStatusDone.length / listaFiltradaPorProjeto.length) *
      100
  )}  %`;
}
//11-33 funcoes que fazer o processo de atualizar as tasks e o %
function MyProjects() {
  const navigate = useNavigate();
  const [projectObj, setProjectObj] = useState([]);
  const [tasksObj, setTasksObj] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [charts, setCharts] = useState(null);
  const canvasRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/cardinator/`
        );
        setProjectObj([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchAmount() {
      try {
        const amountOfTasks = await axios.get(
          `https://ironrest.herokuapp.com/cardinatortasks`
        );
        setTasksObj([...amountOfTasks.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAmount();
    fetchData();
  }, []);

  async function updateProject(selectedProject, newProject) {
    try {
      await axios.put(
        `https://ironrest.herokuapp.com/cardinator/${selectedProject}`,
        newProject
      );

      refreshPage();
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchDeletion(selectedProject) {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/cardinator/${selectedProject}`
      );
      refreshPage();
    } catch (err) {
      console.error(err);
    }
    fetchDeletion();
  }

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setCharts((grafico) => {
        if (grafico) {
          grafico.destroy();
        }
        // ^ o .destroy serve para remover o 'chart' antigo para dar espaço para o novo
        const myChart = new Chart(ctx, {
          type: "doughnut",
          options: { responsive: true, maintainAspectRatio: false },
          data: {
            datasets: [
              {
                data: [0, 1],
                fill: true,
                borderColor: "#EAEAEA",
                backgroundColor: ["#F9c262", "#EAEAEA"],
                tension: 0.1,
              },
            ],
          },
        });
        return myChart;
        //para criar um novo grafico chamo a const após destruir o state anterior, usando o return.
      });
    }
  }, [projectObj]);

  const colorMap = {
    "To start": "#C4C4C4",
    active: "#F9c262",
    completed: "#5DD1B3",
    inative: "#FC599B",
  };
  console.log(projectObj);

  return (
    <div
      style={{
        marginLeft: "12vh",
        marginTop: "12vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {projectObj.map((items) => {
        return (
          <Card
            className="shadow"
            style={{
              width: "18rem",
              borderRadius: "1rem",
              marginBottom: "1rem",
              marginRight: "1rem",
            }}
            key={items._id}
          >
            <Card.Header
              style={{
                backgroundColor: colorMap[items.status],
                borderTopRightRadius: "1rem",
                borderTopLeftRadius: "1rem",
                paddingTop: "1.5vh",
                paddingBottom: "1.5vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              as="h5"
            >
              <strong style={{ marginLeft: "5rem" }}>
                {items.projectName}
              </strong>
              <DropdownButton
                id="dropdown-basic-button"
                title=""
                size="sm"
                menuVariant="light"
                variant="black"
              >
                <Dropdown.Item
                  onClick={() => {
                    fetchDeletion(items._id);
                  }}
                  href="#/action-1"
                >
                  Delete Project
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Edit Project</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    let projectClone = { ...items };
                    projectClone.status = "inative";
                    delete projectClone._id;

                    updateProject(items._id, projectClone);
                  }}
                  href="#/action-3"
                >
                  Stop Project
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    let projectClone = { ...items };
                    projectClone.status = "active";
                    delete projectClone._id;

                    updateProject(items._id, projectClone);
                  }}
                  href="#/action-4"
                >
                  Restart Project
                </Dropdown.Item>
              </DropdownButton>
            </Card.Header>

            <Card.Body
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "0rem",
              }}
              onClick={() => navigate(`/mytasks/${items._id}`)}
            >
              <div
                style={{
                  position: "relative",
                  width: "500px",
                  marginTop: "4rem",
                  bottom: "2rem",
                }}
              >
                <Graph
                  data={{
                    datasets: [
                      {
                        data: [
                          tasksFilteredByStatus(
                            taskFilteredByProject(tasksObj, items._id),
                            "Done"
                          ).length,
                          taskFilteredByProject(tasksObj, items._id).length -
                            tasksFilteredByStatus(
                              taskFilteredByProject(tasksObj, items._id),
                              "Done"
                            ).length,
                        ],
                        //esse é o valor que efetivamente está sendo refletido no grafico do projeto na home
                        fill: true,
                        borderColor: "#EAEAEA",
                        backgroundColor: [colorMap[items.status], "#EAEAEA"],
                        tension: 0.1,
                      },
                    ],
                  }}
                  //esse 'Graph' foi a forma que deu para fazer migrando o nosso canvas para um elemento a parte (ate fica mais organizado)
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  fontWeight: "700",
                  fontSize: "0.7rem",
                  width: "6rem",
                  marginTop: "4.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#515151" }} className="mb-1">
                    {
                      tasksObj.filter((task) => task.projectId === items._id)
                        .length
                    }
                  </p>

                  <hr
                    style={{
                      width: "4.8rem",
                      margin: "0",
                      border: " 2px dotted  black",
                      borderStyle: "none none dotted",
                      backgroundColor: "#fff",
                    }}
                  />

                  <p style={{ color: colorMap[items.status] }}>
                    total of tasks
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#515151" }} className="mb-1" id="status">
                    {items.status}
                  </p>

                  <hr
                    style={{
                      width: "5.5rem",
                      margin: "0",
                      border: " 2px dotted  black",
                      borderStyle: "none none dotted",
                      backgroundColor: "#fff",
                    }}
                  />

                  <p style={{ color: colorMap[items.status] }}>
                    project status
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#515151" }} className="mb-1">
                    {Math.round(
                      (tasksObj.filter(
                        (task) =>
                          task.projectId === items._id && task.status === "Done"
                      ).length /
                        tasksObj.filter((task) => task.projectId === items._id)
                          .length) *
                        100
                    )}
                    %
                  </p>

                  <hr
                    style={{
                      color: "black",
                      width: "15.5rem",
                      margin: "0",
                      border: " 2px dotted  black",
                      borderStyle: "none none dotted",
                      backgroundColor: "#fff",
                    }}
                  />

                  <p
                    style={{
                      color: colorMap[items.status],
                      marginBottom: "0rem",
                    }}
                  >
                    work progress
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default MyProjects;
