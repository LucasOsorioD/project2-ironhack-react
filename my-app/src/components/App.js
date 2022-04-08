import { Routes, Route } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import MyProjects from "./MyProjects";
import MyTasks from "./MyTasks";
import NewProject from "./NewProject";
import Chart from "./Charts";
import InitialData from './InitialData' 

function App() {
  return (
    <div>
    <NavBar/>

      <div className="App">
      
        <MyProjects/>
      </div>
    </div>
  );
}

export default App;
