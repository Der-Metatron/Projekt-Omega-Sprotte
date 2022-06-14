import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [index, setIndex] = useState(0);
  const [higScore, setHighScore] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}`);
        setHighScore(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="App">
      {JSON.stringify(higScore[index]?.higScore)}
      <br />
      <div className="">{higScore[index]?.optionA}</div>
      <br />

      <button
        onClick={() => {
          setIndex(index + 1);
        }}
      >
        next
      </button>
    </div>
  );
}

export default App;
