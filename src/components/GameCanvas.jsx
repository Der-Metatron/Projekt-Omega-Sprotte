import React, { useRef, useEffect, useState } from "react";
import { GameControl } from "../services/game-control";
/* import ReactAudioPlayer from "react-audio-player"; */
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
      {/* ----------------Button Start------------------------------------ */}
      <button
        className="weiterbutton"
        onClick={() => {
          gameControl.current.startGame();
        }}
      >
        New Game
      </button>
      <p className="punkte">Score: {score}</p> {/* Angezeigter Punktezähler */}
      {/* Muss noch eine Routine Geschrieben werden. */}
      {/* <p>{message}</p>  */}{" "}
    </>
  );
};
/* ---------------------Aniemierter Hintergund--------------------------------- */
// verschiedene Farb Punkte
const colors = ["#E0FFFF", "#D2B48C", "#BEBEBE", "#FF4040", "#F5F5DC"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12,
  };

  // eslint-disable-next-line no-unused-vars
  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` },
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});
/* --------------------------------------------------------------------------- */
