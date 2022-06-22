import React, { useRef, useEffect, useState } from "react";
import "./Canvas.css";
import { initGame, stopGame, continueGame } from "../util/canvas-game";
import ReactAudioPlayer from "react-audio-player";

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
      />{" "}
      <p>Score: {score}</p> {/* PunkteZahl im Canvas Zeigen */}
      {/* Stopt das Game  */}
      <button
        onClick={() => {
          stopGame();
        }}
      >
        Stop
      </button>
      {/* Weiter mit Game */}
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
/* -------------------------------------------------------------------------------------- */
<ReactAudioPlayer src="my_audio_file.ogg" autoPlay controls />;
/* ----------------------------AUDIO----------------------------------------------------- */
/* const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, []);
  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
 */
