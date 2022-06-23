import React, { useRef, useEffect, useState } from "react";
import "./Canvas.css";
import { initGame, stopGame, continueGame } from "../util/canvas-game";

export const Canvas = () => {
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    initGame(context, (amount) => {
      console.log("increaseScore", amount);
      setScore((oldScore) => {
        return oldScore + amount;
      });
    });
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        width="1024"
        height="640"
      />
      <p>Score: {score}</p> {/* Punktezahl in Canvas Zeigen */}
      <button
        onClick={() => {
          stopGame();
        }}
      >
        Stop
      </button>
      <button
        onClick={() => {
          continueGame();
        }}
      >
        Weiter
      </button>
    </>
  );
};
/*  Musik,autoplay,loop.------ VOLUME GEHT NICHT????! -->
    <!-- <audio src="audio/Musik/titel 1.mp3" autoplay loop autoplay volume="0.5">
      Sorry - Ihre Browser hat keine Unterstützung für dieses Audio-Format.
    </audio>  */
