/* Hier werden die Einzelnen Seiten Hinzugefügt */
import "./App.css";
import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { Welcome } from "./components/Welcome";
import { Footer } from "./components/Footer";
/* import { Highscore } from "./components/Highscore"; */
/* import ReactAudioPlayer from "react-audio-player"; */

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
          {" "}
          {/* --------------------FORMULAR---------------------------------------------------- */}
          {/*   <div className="Highscore">
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Absenden" />
            </form>
          </div> */}{" "}
          {/* ----------------------AUDIO IN CANVAS------------------------------------------ */}
          {/*     <ReactAudioPlayer
            className="player"
            src="/audio/Musik/titel 1.mp3"
            autoPlay
            controls
            loop
            volume={0.4}
          /> */}
          <GameCanvas />
          <Footer />
          {/*  <Highscore /> */}
        </>
      )}
    </div>
  );
}

export default App;
