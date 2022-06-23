import "./App.css";
import { GameCanvas } from "./components/GameCanvas";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <h1>Projekt Omega</h1>
      <GameCanvas />
      <Footer />
    </div>
  );
}

export default App;
