import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import MyProjects from "./MyProjects";
import MyTasks from "./MyTasks";
import NewProject from "./NewProject";
import Chart from "./Charts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MyProjects />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
