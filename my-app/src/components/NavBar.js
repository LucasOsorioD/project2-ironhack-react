import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-primary">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#C4C4C4",
          color:"white"
        }}
      >
        <div>
          <p>Project 2- React</p>
        </div>
        <div className="icon" onClick={() => navigate("/")}>
          <strong>My Projects</strong>
        </div>
        <div className="icon" onClick={() => navigate("/mytasks")}>
        <strong>Create</strong>
        </div>
        <div className="icon" onClick={() => navigate("/chart")}>
        <strong>Charts</strong>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
