import React from "react";
import "./Welcome.css";
import ReactAudioPlayer from "react-audio-player";

function randomPosition() {
  let y = window.innerWidth;
  let x = window.innerHeight;
  let randomX = Math.floor(Math.random() * x);
  let randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}

export const Welcome = ({ onContinue }) => {
  const starDivs = [];
  for (let i = 0; i < 400; i++) {
    let xy = randomPosition();
    starDivs.push(
      <div
        key={i}
        className="stars"
        style={{
          top: xy[0],
          left: xy[1],
        }}
      ></div>
    );
  }
  /* ----------------------------------------------------------------------------- */
  console.log(starDivs);
  /* ------------------------------------------------------------------------------ */
  return (
    <div className="welcome-container">
      {starDivs}

      {/* <!-- Erste Inro laufschrift --> */}

      <section className="intro">
        In einer Zeit bei DCI mit einer kleinen aufstrebenden Programmier
        Gruppe...................
      </section>
      <section className="logo">
        <img src="/img/1mfdt1024.jpg" alt="Projekt-Omega Geschichte" />
      </section>
      <div id="scroller">
        <div id="content">
          <p id="title">Episode DCI Abschlussprojekt</p>
          <p id="subtitle">Projekt-Omega</p>
          <br />
          <p>
            Du bist alleine mit deinen Raumschiff Omega und kämpfst in einer
            Dystopischen Welt voller feindlichen Gegnern ums überleben.Während
            des 21.Jahrhundert befinden sich in der Umlaufbahn des Planeten Erde
            durch Umweltverschmutzung,zügelloser verbrauch der Ressourcen und
            Machthungriger Politiker Unmengen an Weltraum Schrott, Satelliten
            und Gruppen verschiedener Fraktionen die versuchen dir das Licht
            auszuknipsen dazu kommen nach und nach eine Invasion von Feindlichen
            Flug Objekten dazu und machen dir das Leben zur Hölle. Messe dich
            mit anderen Spielern um die Höchste Punktzahl,verewige dich in der
            Highscore und werde der Ultimative Retter des Universums.
          </p>
          <p>
            Idee: Der Metatron. Programming: Der Metatron, Serdar, Dennis. Musik
            & Sound: Der Metatron. Grafik: Emergancy-Romm Tattoo, Pixbay, Der
            Metatron. Backend: Serdar. Canvas build React: Ralf.
          </p>
          <p>Erstellt mit: Canvas, Html, Reackt, MongoDb, Express, Css.</p>
          <p>
            Danke an alle die uns bei diesen Projekt unterstützt haben und uns
            die gelegenheit gegeben haben unser Ideen zu verwirklichen.Special
            Thanks to Ralf & Chriatian. Und jetzt viel Spaß beim Zocken!!!
          </p>
        </div>
      </div>

      <footer>
        <button
          onClick={() => {
            onContinue();
          }}
        >
          Start Game!
        </button>
      </footer>
    </div>
  );
};
