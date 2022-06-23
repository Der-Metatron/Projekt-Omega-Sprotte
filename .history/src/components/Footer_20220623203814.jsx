import React from "react";
import ReactAudioPlayer from "react-audio-player";
export const Footer = () => {
  return (
    <div>
      <ReactAudioPlayer
        className="player"
        src="/audio/Musik/titel 1.mp3"
        autoPlay
        controls
        loop
        volume={0.5}
      />
    </div>
  );
};
