import Card from "react-bootstrap/Card";
import Charts from "./Charts";

function MyProjects() {
  return (
    <div>
      <Card style={{ width: "15rem", borderRadius: "1rem" }}>
        <Card.Header
          style={{
            backgroundColor: "#F9c262",
            borderTopRightRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
          as="h5"
        >
          #Projeto 01
        </Card.Header>
        <Card.Body>
          <Charts
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          />
          <Card.Text
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
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
