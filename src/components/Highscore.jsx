import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState(""); /* Quelle der Wahrheit */
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`wurde abgeschickt: ${message}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Highscore:</label>
      <textarea value={message} onChange={handleChange} />

      <input type="submit" value="Absenden" />
    </form>
  );
}

export default App;
