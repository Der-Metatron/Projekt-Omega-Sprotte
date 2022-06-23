const KeysToWatch = [
  "Space",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];
const KeyStates = {};
document.addEventListener("keydown", (e) => {
  if (KeysToWatch.includes(e.code)) {
    e.preventDefault();
    KeyStates[e.code] = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (KeysToWatch.includes(e.code)) {
    e.preventDefault();
    KeyStates[e.code] = false;
  }
});

export const GameControl = (context) => {
  const ctx = context;
  let eventListeners = [];
  let gameStarted = false;
  let score = 0;
  const intervals = {
    update: null,
    createUfos: null,
    /* createUfos1: null, */
    checkForCollision: null,
    checkForShoot: null,
  };
  let backgroundImage = new Image();
  let rocket = {
    x: 50,
    y: 200,
    width: 100,
    height: 50,
    src: "img/ufo1.png",
  };
  let ufos = [];
  /*   let ufos1 = [];  */
  let shots = [];

  const loadImages = () => {
    backgroundImage.src = "img/- WALLPAPER - (276).jpg";
    rocket.img = new Image();
    rocket.img.src = rocket.src;
  };

  const draw = () => {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    ufos.forEach(function (ufo) {
      ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });
    /* --------------------Feinde test------------------------------------- */
    /*  ufos1.forEach(function (ufo1) {
      ctx.drawImage(ufo1.img, ufo1.x, ufo1.y, ufo1.width, ufo1.height);
    }); */
    /* --------------------------------------------------------------------------- */
    shots.forEach(function (shot) {
      ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
    });

    if (gameStarted) {
      requestAnimationFrame(draw);
    }
  };

  const update = () => {
    if (KeyStates.ArrowUp) {
      rocket.y -= 6;
    }
    if (KeyStates.ArrowDown) {
      rocket.y += 6;
    }
    if (KeyStates.ArrowLeft) {
      rocket.x -= 6;
    }

    if (KeyStates.ArrowRight) {
      rocket.x += 6;
    }
    ufos.forEach(function (ufo) {
      if (!ufo.hit) {
        ufo.x -= 5;
      }
    });
    /* ------------Feinde test------------------------------ */
    /*  ufos1.forEach(function (ufo1) {
      if (!ufo1.hit) {
        ufo1.x -= 5;
      }
    }); */
    /* --------------------------------------------------------- */
    shots.forEach(function (shot) {
      shot.x += 15;
    });
  };
  /* ---------------------------Routine der Feinde------------------------------------ */
  const createUfos = () => {
    let ufo = {
      x: 800,
      y: Math.random() * 500, // Wir platzieren unsere UFOs an einem zufälligen Ort
      width: 100,
      height: 40,
      src: "img/sat.png" /* Feinde Bild */,

      img: new Image(),
    };
    ufo.img.src = ufo.src; // Ufo-Bild wird geladen.
    ufos.push(ufo);
  };
  /* -------------------------Test neue Feinde-------------------------------------- */
  /*   const createUfos1 = () => {
    let ufo1 = {
      x: 800,
      y: Math.random() * 500, 
      width: 100,
      height: 40,
      src: "/img/spaceship-g2c5115d52_1280.png" 

      img: new Image(),
    };
    ufo1.img.src = ufo1.src; 
    ufos.push(ufo1);
  }; */
  /* ------------------------------------------------------------------------------------- */
  const checkForCollision = () => {
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
        gameOver();
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
          console.log("Collision!!!");
          increaseScore(10);
          setTimeout(() => {
            ufos = ufos.filter((u) => u !== ufo);
          }, 2000);
        }
      });
    });
  };
  /* ------------Feinde test---------------------------------------------- */
  /*  const checkForCollision1 = () => {
      ufos1.forEach(function (ufo1) {
        // Kontrollieren, ob UFO mit Rakete kollidiert
        if (
          rocket.x + rocket.width > ufo1.x &&
          rocket.y + rocket.height > ufo1.y &&
          rocket.x < ufo1.x &&
          rocket.y < ufo1.y + ufo1.height
        ) {
          rocket.img.src = "img/boom3.png";
          console.log("Collion!!!");
          ufos1 = ufos1.filter((u) => u !== ufo1);
          gameOver();
        }

        shots.forEach(function (shot) {
          // Kontrollieren, ob Laser mit Rakete kollidiert
          if (
            shot.x + shot.width > ufo1.x &&
            shot.y + shot.height > ufo1.y &&
            shot.x < ufo1.x &&
            shot.y < ufo1.y + ufo1.height
          ) {
            ufo1.hit = true;
            ufo1.img.src = "img/boom3.png";
            console.log("Collision!!!");
            increaseScore(10);
            setTimeout(() => {
              ufos1 = ufos1.filter((u) => u !== ufo1);
            }, 2000);
          }
        });
      });
    }; */
  /* --------------------------------------------------------------------- */
  const checkForShoot = () => {
    if (KeyStates.Space) {
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
  };

  const gameOver = () => {
    clearIntervals();
    gameStarted = false;
    fireEvent("game_over");
  };

  const increaseScore = (increment) => {
    score += increment;
    fireEvent("score_changed", { score });
  };

  const resetScore = () => {
    score = 0;
    fireEvent("score_changed", { score });
  };

  const clearIntervals = () => {
    for (let [key, value] of Object.entries(intervals)) {
      if (value !== null) {
        clearInterval(value);
      }
      intervals[key] = null;
    }
  };
  const startIntervals = () => {
    clearIntervals();
    intervals.update = setInterval(update, 1000 / 25);
    intervals.createUfos = setInterval(createUfos, 2000);
    intervals.checkForCollision = setInterval(checkForCollision, 1000 / 25);
    intervals.checkForShoot = setInterval(checkForShoot, 1000 / 10);
  };

  const fireEvent = (event, payload) => {
    for (let listener of eventListeners) {
      listener(event, payload);
    }
  };

  const initGame = () => {
    rocket.x = 50;
    rocket.y = 200;
    ufos = [];
    /*  ufos1 = []; */ /* feind test */
    shots = [];
    loadImages();
    clearIntervals();
    resetScore();
  };

  return {
    addEventListener: (listener) => {
      console.log("addEventListener", listener);
      eventListeners.push(listener);
    },
    startGame: () => {
      initGame();
      startIntervals();
      gameStarted = true;
      draw();
    },
    pauseGame: () => {
      clearIntervals();
      gameStarted = false;
    },
    continueGame: () => {
      startIntervals();
      gameStarted = true;
      draw();
    },
    endGame: () => {
      clearIntervals();
      gameStarted = false;
    },
  };
};
