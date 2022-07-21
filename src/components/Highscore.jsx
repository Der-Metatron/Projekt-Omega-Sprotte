import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Highscore.css";

export function Highscore() {
  const [nameGamer, setNameGamer] = useState("");
  const [highScore, setHighScore] = useState([]);
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
        setHighScore(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <>
      <br></br>
      <div className="überschrift">
        <p>Projeckt-Omega</p>
      </div>
      <br></br> <br></br>
      <br></br> <br></br>
      <div className="score">
        <table>
          {highScore.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.highscore}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="inputfeld">
        <form onSubmit={handleSubmit}>
          <div className="hscore">
            {" "}
            <label>Highscore:</label>
          </div>

          <textarea value={message} onChange={handleChange} />
          {/*   <div>{JSON.stringify(nameGamer[0])}</div> */}
          <div className="input">
            <input type="submit" value="Absenden" />
          </div>
        </form>
      </div>
    </>
  );
}
