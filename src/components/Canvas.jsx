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
      <p>Score: {score}</p>
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
