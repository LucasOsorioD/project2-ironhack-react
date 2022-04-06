import Card from 'react-bootstrap/Card'

function MyProjects(){
    return(
        <div>
            <Card style={{width:"15rem", borderRadius:"1rem"}}>
                <Card.Header style={{backgroundColor:"#F9c262", borderTopRightRadius:"1rem", borderTopLeftRadius:"1rem"}} as="h5">#Projeto 01</Card.Header>
                <Card.Body>
                    <Card.Title>#Inserir nome do projeto aqui</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
        </Card>
        </div>
    );
}
export default MyProjects;