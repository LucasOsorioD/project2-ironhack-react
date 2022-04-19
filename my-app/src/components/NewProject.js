import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewProject() {
  const [newProj, setNewProj] = useState();
  function refreshPage() {
    window.location.reload(false);
  }
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
            name="{name}"
            style={{ marginTop: "0.5rem", width: "18rem" }}
          />
          <Form.Label style={{ marginTop: "1rem" }}>
            <strong>Amount of contributors</strong>
          </Form.Label>
          <Form.Control
            type="form"
            name="{name}"
            style={{ marginTop: "0.5rem", width: "18rem" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{ marginTop: "3rem" }}
        >
          Create New Project
        </Button>
      </Form>
    </div>
  );
}
export default NewProject;
