import logopageNotFound from "../imgs/logo-pageNotFound.png";

function NotFound() {
  return (
    <div
      style={{
        marginTop: "25vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logopageNotFound}
        alt="cara triste por erro na pagina"
        style={{ width: "215px", marginRight: "2vh", marginTop: "3vh" }}
      />
      <div>
        <strong style={{ fontSize: "13vh" }}>404 error</strong> <br />
        <strong style={{ fontSize: "5vh" }}>Sorry, the page you are</strong>
        <br />
        <strong style={{ fontSize: "5vh", marginLeft: "3vh" }}>
          looking for is not here :/
        </strong>
      </div>
    </div>
  );
}

export default NotFound;
