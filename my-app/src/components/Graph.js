import Chart from "chart.js/auto";
import { useState, useRef, useEffect } from "react";

function Graph(props) {
  const [chart, setChart] = useState(null);
  const canvasRef = useRef();

  useEffect(() => {
    setChart((prevChart) => {
      if (prevChart) {
        prevChart.destroy();
      }

      return new Chart(canvasRef.current, {
        type: "doughnut",
        options: { responsive: true, maintainAspectRatio: false },
        data: { ...props.data },
      });
    });

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [props.data]);

  return <canvas id="myChart" width="150" height="150" ref={canvasRef} />;
}

export default Graph;
