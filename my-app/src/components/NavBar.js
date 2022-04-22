import { Link, useNavigate } from "react-router-dom";
import cardinator_logo from "../imgs/cardinator_logo.png";
import avatar1 from "../imgs/avatar1.png";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-primary">
      <div
        style={{
          backgroundColor: "#969696",
          color: "white",
          display: "flex",
          alignItems: "baseLine",
        }}
      >
        <div
          style={{ marginLeft: "7vh" }}
          className="icon"
          onClick={() => navigate("/")}
        >
          <img
            src={cardinator_logo}
            alt="logo Cardinator"
            style={{ width: "150px", marginTop: "1vh", marginBottom: "1vh" }}
          />
        </div>
        <div
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            display: "flex",
            fontSize: "2.5vh",
          }}
        >
          <div
            className="icon"
            onClick={() => navigate("/")}
            style={{ marginRight: "8vh", marginLeft: "15vh" }}
          >
            <strong>my projects</strong>
          </div>
          <div
            className="icon"
            onClick={() => navigate("/newproject")}
            style={{ marginRight: "8vh", marginLeft: "3vh" }}
          >
            <strong>create</strong>
          </div>
          <div
            className="icon"
            onClick={() => navigate("/chart")}
            style={{ marginLeft: "3vh" }}
          >
            <strong>charts</strong>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "2.5vh", marginLeft: "95vh" }}>
          <strong>Hello, Nat </strong>
          <img
            src={avatar1}
            alt="Icone representando uma mulher"
            style={{ width: "35px", marginLeft: "1.5vh" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
