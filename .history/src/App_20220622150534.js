import "./App.css";
/* import { useState } from "react"; */
import { Canvas } from "./components/Canvas";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <h1>Projekt Omega</h1>
      <Canvas />

      <Footer />
    </div>
  );
}

export default App;
