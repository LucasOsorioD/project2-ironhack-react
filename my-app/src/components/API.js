import axios from "axios";
import { useState, useEffect } from "react";

function Api() {
  const [projectObj, setProjectObj] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/cardinator/`
        );
        setProjectObj([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    console.log("hello, Brasil");
    return <div></div>;
  }, []);
}
export default Api;
