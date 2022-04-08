<<<<<<< HEAD

import { Routes, Route } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> 09de8f7473451edc98daf85b91d971d4d2df59d4
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import MyProjects from "./MyProjects";
import MyTasks from "./MyTasks";
import NewProject from "./NewProject";
import Chart from "./Charts";
<<<<<<< HEAD
import InitialData from './InitialData' 
=======
import NotFound from "./NotFound"
>>>>>>> 09de8f7473451edc98daf85b91d971d4d2df59d4

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<MyProjects />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
