import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardHeader from "react-bootstrap/esm/CardHeader";


function NewProject() {
  const [newProj, setNewProj] = useState({
    projectName: "",
    status: "To start",
    workProgress: 0,
    totalAmountTasks: 0,
    completedTasks: 0,
  });
   const navigate = useNavigate();

  function handleSubmit() {
    async function fetchNewData() {
      try {
         await axios.post(
          "https://ironrest.herokuapp.com/cardinator/",
          newProj
        );
        refreshPage();
      } catch (err) {
        console.error(err);
      }
    }
    fetchNewData();
  }
  function handleChange(event) {
    setNewProj({ ...newProj, [event.target.name]: event.target.value });
  }
  function refreshPage() {
    window.location.reload(false);
  }


  return (
    <div>
      <Card
        className="shadow"
        style={{
          width: "30rem",
          borderRadius: "1rem",
          marginBottom: "1rem",
          marginRight: "1rem",
          display: "flex",
          position: "relative",
          left: "30rem",
          top: "8rem",
        }}
      >
        <Card.Header
          style={{
            height: "5rem",
            backgroundColor: "#969696",
            borderTopRightRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
        >
          <h3 style={{ marginTop: "1rem", color: "#fff" }}>
            <strong>Create new project</strong>
          </h3>
        </Card.Header>
        <Card.Body>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h5>
                  <strong>Project Name</strong>
                </h5>
              </Form.Label>
              <Form.Control
                type="form"
                name="projectName"
                value={newProj.projectName}
                onChange={handleChange}
                style={{ marginTop: "0.5rem", width: "18rem" }}
              />
            </Form.Group>
            <Button
              variant="secondary"
              onClick={() => {
                handleSubmit();
                navigate("/");
              }}
              style={{ marginTop: "3rem", marginBottom: "3rem" }}
            >
              <strong>Create </strong>
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default NewProject;
