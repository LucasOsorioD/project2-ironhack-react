import axios from "axios";
import {useState, useEfect} from "react";

function Api() {

  const [projectObj, setProjectObj] = useState[
    {
      projectName: "",
      status: "",
      contributors: 0,
      workProgress: "",
      totalAmountTasks: 0
    }
  ];

  async function fetchData() {
    try {
      const response = axios.get(`https://ironrest.herokuapp.com/cardinator/`);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  console.log("hello, Brasil");
  fetchData();
  return <div></div>;
}

export default Api;
