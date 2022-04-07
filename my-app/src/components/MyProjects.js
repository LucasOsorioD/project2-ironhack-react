import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'

function MyProjects(){
    return(
        <div>
            <Card style={{width:"15rem", borderRadius:"1rem"}}>
                <Card.Header style={{backgroundColor:"#F9c262", borderTopRightRadius:"1rem", borderTopLeftRadius:"1rem"}} as="h5">#Projeto 01</Card.Header>
                <Card.Body>
                    <Card.Title>#Inserir breve resumo do projeto aqui</Card.Title>
                    <Card.Text>
                        <strong>Contributors:</strong>
                    </Card.Text>
                    <Card.Text>
                        <strong>Amount of tasks:</strong> 
                    </Card.Text>
                    <Card.Text>
                        <strong>Status:</strong> 
                    </Card.Text>
                    <ProgressBar>
                        <ProgressBar striped variant="success" now={45} key={1} />
                        <ProgressBar variant="warning" now={30} key={2} />
                        <ProgressBar striped variant="danger" now={25} key={3} />
                    </ProgressBar>
                </Card.Body>
        </Card>
        </div>
    );
}
export default MyProjects;