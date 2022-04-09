import Card from "react-bootstrap/Card";
import Charts from "./Charts";
import Chart from "chart.js/auto";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MyProjects() {
  const navigate = useNavigate();
  const [projectObj, setProjectObj] = useState([]);
  const [charts, setCharts] = useState(null);
  const canvasRef = useRef();
  //ref é uma variavel que nao força recarregar a tela porem armazena o conteudo atual

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
    fetchData();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setCharts((grafico) => {
        console.log(grafico)
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
                data: [35, 65],
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
  console.log(charts);
  return (
    <div style={{ marginLeft: "12vh", marginTop: "12vh" }}>
      {projectObj.map((items) => {
        return (
          <Card
            className="shadow"
            style={{ width: "18rem", borderRadius: "1rem" }}
            onClick={() => navigate("/mytasks")}
            key={items._id}
          >
            <Card.Header
              style={{
                backgroundColor: "#F9C262",
                borderTopRightRadius: "1rem",
                borderTopLeftRadius: "1rem",
                paddingTop: "1.5vh",
                paddingBottom: "1.5vh",
              }}
              as="h5"
            >
              <strong>{items.projectName}</strong>
            </Card.Header>
            <Card.Body style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  position: "relative",
                  width: "500px",
                  marginTop: "4rem",
                  bottom: "2rem",
                }}
              >
                <canvas id="myChart" width="150" height="150" ref={canvasRef} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  fontWeight: "700",
                  fontSize: "0.7rem",
                  width: "6rem",
                  marginTop: "2rem",
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
                    {items.contributors}
                  </p>

                  <hr
                    style={{
                      width: "4.3rem",
                      margin: "0",
                      border: " 2px dotted  black",
                      borderStyle: "none none dotted",
                      backgroundColor: "#fff",
                    }}
                  />

                  <p style={{ color: "#F9c262" }}>contributors</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#515151" }} className="mb-1">
                    {items.totalAmountTasks}
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

                  <p style={{ color: "#F9c262" }}> total of tasks</p>
                </div>
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

                  <p style={{ color: "#F9c262" }}>project status</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "#515151" }} className="mb-1">
                    {items.workProgress}
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

                  <p style={{ color: "#F9c262", marginBottom: "0" }}>
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

//Card do projeto-

//Pegar o total de tasks do projeto e colocar no card;
//O status do card é baseado em três coisas:
//1. Status "completo" será criado quando todas as tasks estiverem finalizadas;
//2. Status "pendente" acontecerá ao usuário selecionar a opção "stop project";
//3. Status "active" acontecerá quando o card de projeto for criado(estado inicial);

//criar gráfico de status
// emojis :)

// aba de delete, edit e stop ou restart project
//pensar sobre os contribuidores.
