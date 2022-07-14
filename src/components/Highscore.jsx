import React, { useState, useEffect } from "react";
import axios from "axios";

function Highscore() {
  const [nameGamer, setNameGamer] = useState();
  /* const [highScore, setHighScore] = useState([]); */
  const [message, setMessage] = useState(""); /* Quelle der Wahrheit */
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`wurde abgeschickt: ${message}`);
  };
  /* -------------AXIOS---------------------- */
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:4000");
        setNameGamer(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <label>Highscore:</label>
      <textarea value={message} onChange={handleChange} />
      <div>{JSON.stringify(nameGamer[0])}</div>
      <input type="submit" value="Absenden" />
    </form>
  );
}

export default Highscore();
