import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}`);
        setCurrentQuestion(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="App">
      {JSON.stringify(currentQuestion[index]?.question)}
      <br />
      <div className="">
        {currentQuestion[index]?.optionA}

        <br />
        {currentQuestion[index]?.optionB}
        <br />
        {currentQuestion[index]?.optionC}
      </div>
      <br />
      <div className="antwort">{currentQuestion[index]?.answer}</div>
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
