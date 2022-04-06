import Card from "react-bootstrap/Card";

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
          #Project name
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title> */}
          <Card.Text >
       
            <p>Contributors</p>
           
            <p>Total of tasks</p>
           
            <p>Project status</p>
     
            <p>Work progress</p>
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
