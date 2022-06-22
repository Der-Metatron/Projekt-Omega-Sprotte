let KEY_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; // 40
let KEY_LEFT = false; // 37
let KEY_RIGHT = false; // 39
let canvas;
let ctx;
let backgroundImage = new Image();
let increaseScore = () => {};
let gameStarted = false;

/* Audio Web-Audio-API  */
/*  
<audio src="/public/audio/Musik/titel 1.mp3"></audio>;
const audioContext = new AudioContext();
const element = document.querySelector(audio);
const source = audioContext.createMediaElementSource(element);
source.connect(audioContext.destination);
audio.play();
*/
/* OMEGA */
let rocket = {
  x: 50,
  y: 200,
  width: 100,
  height: 50,
  src: "img/ufo1.png",
};
/* ---------------------------------------------------------------------------------- */
/* let ufos1 = []; */ /* test */
let ufos = [];
let shots = [];
// Taste Unten
document.onkeydown = function (e) {
  if (e.keyCode === 32) {
    // Leertaste gedrückt
    KEY_SPACE = true;
  }

  if (e.keyCode === 38) {
    // Nach oben gedrückt
    KEY_UP = true;
  }

  if (e.keyCode === 40) {
    // Nach unten gedrückt
    KEY_DOWN = true;
  }
  if (e.keyCode === 37) {
    KEY_LEFT = true;
  }
  if (e.keyCode === 39) {
    KEY_RIGHT = true;
  }
};
// Taste Links
document.onkeyleft = function (e) {
  if (e.keyCode === 37) {
    // Leertaste gedrückt
    KEY_SPACE = true;
  }

  if (e.keyCode === 38) {
    // Nach oben gedrückt
    KEY_UP = true;
  }

  if (e.keyCode === 40) {
    // Nach unten gedrückt
    KEY_DOWN = true;
  }
  /* -------------------------------------------------------------------------------------- */
  if (e.keyCode === 37) {
    KEY_LEFT = true;
  }
  if (e.keyCode === 39) {
    KEY_RIGHT = true;
  }
  /* ------------------------------------------------------------------------------------------ */
};
// Taste Rechts
document.onkeyright = function (e) {
  if (e.keyCode === 39) {
    // Leertaste gedrückt
    KEY_SPACE = true;
  }

  if (e.keyCode === 38) {
    // Nach oben gedrückt
    KEY_UP = true;
  }

  if (e.keyCode === 40) {
    // Nach unten gedrückt
    KEY_DOWN = true;
  }
  if (e.keyCode === 37) {
    KEY_LEFT = true;
  }
  if (e.keyCode === 39) {
    KEY_RIGHT = true;
  }
};
// Taste Oben
document.onkeyup = function (e) {
  if (e.keyCode === 32) {
    // Leertaste losgelassen
    KEY_SPACE = false;
  }

  if (e.keyCode === 38) {
    // Nach oben losgelassen
    KEY_UP = false;
  }

  if (e.keyCode === 40) {
    // Nach unten losgelassen
    KEY_DOWN = false;
  }
  if (e.keyCode === 37) {
    KEY_LEFT = false;
  }
  if (e.keyCode === 39) {
    KEY_RIGHT = false;
  }
};
/* --------------------------------------------------------------------------------- */
export function initGame(context, increaseScoreCallback) {
  ctx = context;
  increaseScore = increaseScoreCallback;
  loadImages();
  setInterval(update, 1000 / 25); /* Wie schnell Feinde kommen */
  setInterval(createUfos, 2000); /* Wie viele Feinde gerendert werden */
  setInterval(checkForCollion, 1000 / 25); /* Collisions abfrage */
  setInterval(checkForShoot, 1000 / 10); /* Schuss Geschwindigkeit */
  gameStarted = true;
  draw();
}

export function stopGame() {
  gameStarted = false;
}

export function continueGame() {
  gameStarted = true;
  draw();
}
/* ------------------------------PROBLEM------------------------------------------- */
// eslint-disable-next-line no-unused-vars
function startGame() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}
/* ------------------------------------------------------------------------------------ */
function checkForCollion() {
  ufos.forEach(function (ufo) {
    // Kontrollieren, ob UFO mit Rakete kollidiert
    if (
      rocket.x + rocket.width > ufo.x &&
      rocket.y + rocket.height > ufo.y &&
      rocket.x < ufo.x &&
      rocket.y < ufo.y + ufo.height
    ) {
      rocket.img.src = "img/boom3.png";
      console.log("Collion!!!");
      ufos = ufos.filter((u) => u !== ufo);
      window.location.reload(true); //das sorgt dafür das sich die seite neu lädt wen man stirbt
    }

    shots.forEach(function (shot) {
      // Kontrollieren, ob Laser mit Rakete kollidiert
      if (
        shot.x + shot.width > ufo.x &&
        shot.y + shot.height > ufo.y &&
        shot.x < ufo.x &&
        shot.y < ufo.y + ufo.height
      ) {
        ufo.hit = true;
        ufo.img.src = "img/boom3.png";
        console.log("Collion!!!");
        increaseScore(10);

        setTimeout(() => {
          ufos = ufos.filter((u) => u !== ufo);
        }, 2000);
      }
    });
  });
}

function createUfos() {
  let ufo = {
    x: 800,
    y: Math.random() * 500, // Wir platzieren unsere UFOs an einem zufälligen Ort
    width: 100,
    height: 40,
    src: "img/sat.png",

    img: new Image(),
  };
  ufo.img.src = ufo.src; // Ufo-Bild wird geladen.
  ufos.push(ufo);
}

function checkForShoot() {
  if (KEY_SPACE) {
    let shot = {
      x: rocket.x + 110,
      y: rocket.y + 22,
      width: 20,
      height: 4,
      src: "img/shot.png",
      img: new Image(),
    };
    shot.img.src = shot.src; // Laser-Bild wird geladen.

    shots.push(shot);
  }
}
//rechts und links vergessen in update zu codieren
function update() {
  if (KEY_UP) {
    rocket.y -= 6;
  }

  if (KEY_DOWN) {
    rocket.y += 6;
  }
  if (KEY_LEFT) {
    rocket.x -= 6;
  }

  if (KEY_RIGHT) {
    rocket.x += 6;
  }

  ufos.forEach(function (ufo) {
    if (!ufo.hit) {
      ufo.x -= 5;
    }
  });

  shots.forEach(function (shot) {
    shot.x += 15;
  });
}

function loadImages() {
  backgroundImage.src = "img/- WALLPAPER - (276).jpg";
  rocket.img = new Image();
  rocket.img.src = rocket.src;
}

function draw() {
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

  ufos.forEach(function (ufo) {
    ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
  });

  shots.forEach(function (shot) {
    ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
  });

  if (gameStarted) {
    requestAnimationFrame(draw);
  }
}

<ReactAudioPlayer src="/public/audio/Musik/titel 1.mp3" autoPlay controls />;
