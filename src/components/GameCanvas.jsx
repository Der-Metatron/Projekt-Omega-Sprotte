import React, { useRef, useEffect, useState } from "react";
import { GameControl } from "../services/game-control";
import ReactAudioPlayer from "react-audio-player";
import "./GameCanvas.css";
/* ---------------------USE SOUND werden geladen------------------------------ */
import useSound from "use-sound";
import boopSfx from "../asset/sound/Laser.mp3";
import boopSfx1 from "../asset/sound/Button1.mp3";
import boopSfx2 from "../asset/sound/Button.mp3";
import boopSfx3 from "../asset/sound/Boom.mp3";
import boopSfx4 from "../asset/sound/Explo.mp3";
import boopSfx5 from "../asset/sound/Maschingun.mp3";

export const GameCanvas = () => {
  /* -----------USE SOUND-------------------------------------------- */
  const [play] = useSound(boopSfx);
  const [play1] = useSound(boopSfx1);
  const [play2] = useSound(boopSfx2);
  const [play3] = useSound(boopSfx3);
  const [play4] = useSound(boopSfx4);
  const [play5] = useSound(boopSfx5);
  /* -------------SCORE------------------------------------------------ */

  const [score, setScore] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const canvasRef = useRef(null);
  const gameControl = useRef(null);
  /* -------------------------------------------------------------------------- */
  /*   const [nextSite, setNextSite] = useState(0);  */
  /* -------------------------------------------------------------------------- */
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

        /* -------------------Sound bei------------------------------------------ */
        case "treffer":
          if (play3) {
            play3();
          }
          break;
        case "kolision":
          if (play4) {
            play4();
          }
          break;
        case "laser":
          if (play) {
            play();
          }
          /*      break;
        case "laser1":
          if (play5) {
            play5();
          } */
          break;
        default:
          break;
      }
    });
    gameControl.current.startGame();
  }, [play, play3, play4, play5]); /* Sound Commponenten */
  /* -------------------Input Punktezähler für Backend------------------------------------------ */
  // eslint-disable-next-line no-unused-vars
  const [nameGamer, setNameGamer] = useState();
  const [userCreate, setUserCreate] = useState([]);
  const handleChange = (i) => {
    setUserCreate({
      ...userCreate,
      [i.target.nameGamer]: i.target.value,
      [i.target.highScore]: i.target.value,
    });
  };
  return (
    <>
      {" "}
      <div className="oben">
        {/* --------------------Spiel Hintergrundmusik----------------------------- */}
        <ReactAudioPlayer
          className="player"
          src="/audio/Musik/Alien.mp3"
          autoPlay
          controls
          loop
          volume={0.5} /* Musik Lautstärke */
        />
        {/* -------------------Laser Test Button---------------------------------- */}
        {/*   <button onClick={play}>Boop!</button> */}
        {/* ------------------PunkteZähler------------------------------------------ */}
        <p className="punkte">Score: {score}</p>{" "}
      </div>
      {/* -----------------Größe desCanvas-------------------------------------- */}
      <canvas
        ref={canvasRef}
        className="game-canvas"
        width="1024"
        height="640"
      />
      {/* --------------Button Container------------------------------------------- */}
      <div className="buttoncontainer">
        <button
          className="stopgame"
          onClick={() => {
            play2();
            gameControl.current.endGame();
          }}
        >
          Stop Game
        </button>
        {/* -------------------Input Feld ab 1000 Punkte------------------------------------- */}
        {score > 10000 ? (
          <form className="eintrag" onSubmit={(i) => handleChange(i)}>
            <input
              name="nameGamer"
              value={nameGamer}
              item="nameGamer"
              placeholder="Trage deinen Namen ein"
            />
            <button
              className="newgame"
              onClick={() => {
                play1();
                gameControl.current.startGame();
              }}
            >
              New Game
            </button>
          </form>
        ) : (
          <button
            className="newgame"
            onClick={() => {
              play1();
              gameControl.current.startGame();
            }}
          >
            New Game
          </button>
        )}
      </div>
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
