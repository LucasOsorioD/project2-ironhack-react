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
    <div style={{ marginLeft: "12vh", marginTop: "12vh" }}>
      <Card className="shadow" style={{ width: "18rem", borderRadius: "1rem" }}>
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
          <strong >#project name</strong>
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
            <canvas id="myChart" width="150" height="150"></canvas>
          </div>
          <Card.Text>
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
                  2
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
                  150
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
                <p style={{ color: "#515151" }} className="mb-1">
                  active
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
                  70 %
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
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default MyProjects;

