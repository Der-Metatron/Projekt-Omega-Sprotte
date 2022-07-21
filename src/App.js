/* Hier werden die Einzelnen Seiten Hinzugefügt */
import "./App.css";
import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { Welcome } from "./components/Welcome";
/* import { Footer } from "./components/Footer";
import { Highscore } from "./components/Highscore"; */

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="App">
      {currentPage === 0 ? (
        <>
          <Welcome
            onContinue={() => {
              setCurrentPage(1);
            }}
          />
        </>
      ) : (
        <>
          <GameCanvas />
          {/*  <Footer />
          <Highscore /> */}
        </>
      )}
    </div>
  );
}

export default App;
