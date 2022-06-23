import React, { useRef, useEffect, useState } from "react";
import { GameControl } from "../services/game-control";
import ReactAudioPlayer from "react-audio-player";

import "./GameCanvas.css";

export const GameCanvas = () => {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const canvasRef = useRef(null);
  const gameControl = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    gameControl.current = GameControl(context);
    gameControl.current.addEventListener((event, payload) => {
      switch (event) {
        case "score_changed":
          setScore(payload.score);
          break;
        case "game_over":
          setMessage("Game Over!");
          break;
        default:
          break;
      }
    });
    gameControl.current.startGame();
  }, []);

  return (
    <>
      {/* -----------------Größe desCanvas-------------------------------------- */}
      <canvas
        ref={canvasRef}
        className="game-canvas"
        width="1024"
        height="640"
      />
      {/* --------------Button Stop------------------------------------------- */}
      <button
        className="canvas_button"
        onClick={() => {
          gameControl.current.endGame();
        }}
      >
        Stop
      </button>
      {/* ----------------Button Stsrt------------------------------------ */}
      <button
        onClick={() => {
          gameControl.current.startGame();
        }}
      >
        Start
      </button>
      <p>Score: {score}</p> {/* Angezeigter Punktezähler */}
      <p>{message}</p> {/* FEHLER */}
      {/* -------------------------------AUDIO----------------------------------------------- */}
      
        <ReactAudioPlayer
          src="/audio/Musik/titel 1.mp3"
          autoPlay
          controls
          loop
          volume={0.5}
        />
      </div>
      {/* ------------------------------------------------------------------------------------ */}
    </>
  );
};
