import Card from "react-bootstrap/Card";
import Charts from "./Charts";

function MyProjects() {
  return (
    <div>
      <Card style={{ width: "15rem", borderRadius: "1rem" }}>
        <Card.Header
          style={{
            backgroundColor: "#F9C262",
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
