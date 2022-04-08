import Card from "react-bootstrap/Card";
import Charts from "./Charts";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";

function MyProjects() {
  useEffect(() => {
    const ctx = document.getElementById("myChart");

    const myChart = new Chart(ctx, {
      type: "doughnut",
      options: { responsive: true, maintainAspectRatio: false },
      data: {
        datasets: [
          {
            data: [70, 30],
            fill: true,
            borderColor: "#EAEAEA",
            backgroundColor:["#F9c262",
            "#EAEAEA"],
            tension: 0.1,
          },
        ],
      },
    });
  }, []);

  return (
    <div style={{ marginLeft: "27vh", marginTop: "12vh" }}>
      <Card style={{ width: "15rem", borderRadius: "1rem" }}>
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
          <strong>#project name</strong>
        </Card.Header>
        <Card.Body style={{display: "flex", flexDirection: "row"}}>
          <div style={{ position: "relative", height: "150px" }}>
            <canvas id="myChart" width="100" height="100"></canvas>
          </div>
          <Card.Text
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              color: "#F9c262",
              fontWeight: "700",
            }}
          >
            <p>contributors</p>
            <p>total of tasks</p>
            <p>project status</p>
            <p>work progress</p>
          </Card.Text>
        </Card.Body>
      </Card>
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
