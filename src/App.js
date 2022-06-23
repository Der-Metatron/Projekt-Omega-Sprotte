import "./App.css";
import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { Welcome } from "./components/Welcome";
import { Footer } from "./components/Footer";

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
          <h1>Projekt Omega</h1>
          <GameCanvas />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
