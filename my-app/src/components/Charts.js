import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import Graph from "./Graph";

function Charts() {
  const [projectObj, setProjectObj] = useState([]);
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
  }, []);

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
                backgroundColor: "#EAEAEA",
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
    inactive: "#FC599B",
  };

  return (
    <div>
      <h1> CHARTS</h1>
      {projectObj.map(() => {
        return (
          <div>
            <Graph
              data={{
                datasets: [
                  {
                    data: [
                      2,
                      3
                    ],
                    //esse é o valor que efetivamente está sendo refletido no grafico do projeto na home
                    fill: true,
                    borderColor: "#EAEAEA",
                    backgroundColor:"#EAEAEA",
                    tension: 0.1,
                  },
                ],
              }}
              //esse 'Graph' foi a forma que deu para fazer migrando o nosso canvas para um elemento a parte (ate fica mais organizado)
            />
          </div>
        );
      })}
    </div>
  );
}
export default Charts;
