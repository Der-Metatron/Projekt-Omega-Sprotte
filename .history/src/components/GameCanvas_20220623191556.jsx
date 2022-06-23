import React, { useRef, useEffect, useState } from "react";
import { GameControl } from "../services/game-control";
import ReactAudioPlayer from "react-audio-player";

import "./GameCanvas.css";

export const GameCanvas = () => {
  const [score, setScore] = useState(0);
  // eslint-disable-next-line no-unused-vars
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
        className="stopbutton"
        onClick={() => {
          gameControl.current.endGame();
        }}
      >
        Stop
      </button>
      {/* ----------------Button Stsrt------------------------------------ */}
      <button
        className="weiterbutton"
        onClick={() => {
          gameControl.current.startGame();
        }}
      >
        Start
      </button>
      <p className="punkte">Score: {score}</p> {/* Angezeigter Punktezähler */}
      {/* Muss noch eine Routine Geschrieben werden. */}
      {/* <p>{message}</p>  */}{" "}
      {/* -------------------------------AUDIO----------------------------------------------- */}
      <ReactAudioPlayer
        src="/audio/Musik/titel 1.mp3"
        autoPlay
        controls
        loop
        volume={0.5}
      />
    </>
  );
};
