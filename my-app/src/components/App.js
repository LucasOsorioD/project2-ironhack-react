import { Routes, Route } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import MyProjects from "./MyProjects";
import MyTasks from "./MyTasks";
import NewProject from "./NewProject";
import Charts from "./Charts";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MyProjects />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/chart" element={<Charts />} />
        <Route path="/mytasks/:id" element={<MyTasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
