import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


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
        const addNewProj = await axios.post(
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
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            <strong>New Project Name</strong>
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
            navigate("/")
          }}
          style={{ marginTop: "3rem" }}
        >
          Create New Project
        </Button>
      </Form>
    </div>
  );
}
export default NewProject;
