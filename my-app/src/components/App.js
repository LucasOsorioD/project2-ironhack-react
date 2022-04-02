import { Routes, Route } from "react-router-dom";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "./NavBar";
import MyProjects from "./MyProjects";
import MyTasks from "./MyTasks";
import NewProject from "./NewProject";
import Chart from "./Charts";

function App() {
  return (
    <div>
    <NavBar/>

      <div className="App">
        {/* <Route path="/" element={<MyProjects />} /> */}
      </div>
    </div>
  );
}

export default App;
