/* -----------------------KEYS----------------------------------------------- */
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
/* ---------------------------------------------------------------------------- */
export const GameControl = (context) => {
  const ctx = context;
  let eventListeners = [];
  let gameStarted = false;
  let score = 0;
  const intervals = {
    update: null,
    createUfos: null,
    createUfos1: null /* test */,
    createUfos2: null /* test */,
    createUfos3: null /* test */,
    checkForCollision: null,
    checkForCollision1: null /* test */,
    checkForCollision2: null /* test */,
    checkForCollision3: null /* test */,
    checkForShoot: null,
    checkForShoot1: null /* Laser Upgrade */,
  };
  let backgroundImage = new Image();
  let rocket = {
    x: 50,
    y: 200,
    width: 100,
    height: 50,
    src: "img/omega.png" /* Omega-Bild */,
  };
  let ufos = [];
  let ufos1 = []; /* test */
  let ufos2 = []; /* test */
  let ufos3 = []; /* test */
  let shots = [];
  let shots1 = []; /* Laser Upgrade */
  /* ------------------Background Bild--------------------------------------- */
  const loadImages = () => {
    backgroundImage.src = "img/- WALLPAPER - (276).jpg";
    rocket.img = new Image();
    rocket.img.src = rocket.src;
  };
  /* ----------------------Feinde----------------------------------------------- */
  const draw = () => {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    ufos.forEach(function (ufo) {
      ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });
    /* --------------------Feinde test1------------------------------------- */
    ufos1.forEach(function (ufo1) {
      if (score > 2000)
        ctx.drawImage(ufo1.img, ufo1.x, ufo1.y, ufo1.width, ufo1.height);
    });
    /* --------------------Feinde test2------------------------------------- */
    ufos1.forEach(function (ufo2) {
      ctx.drawImage(ufo2.img, ufo2.x, ufo2.y, ufo2.width, ufo2.height);
    });
    /* --------------------Feinde test3------------------------------------- */
    ufos3.forEach(function (ufo3) {
      ctx.drawImage(ufo3.img, ufo3.x, ufo3.y, ufo3.width, ufo3.height);
    });
    /* --------------------Schuss funktion------------------------------- */
    shots.forEach(function (shot) {
      ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
    });
    /* --------------------Laser Upgrade------------------------------- */
    shots1.forEach(function (shot1) {
      if (score > 1000)
        ctx.drawImage(shot1.img, shot1.x, shot1.y, shot1.width, shot1.height);
    });

    if (gameStarted) {
      requestAnimationFrame(draw);
    }
  };
  /* -------------------------KEYS------------------------------------------------- */
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
    /* ------------Feinde test1------------------------------ */
    ufos1.forEach(function (ufo1) {
      if (!ufo1.hit) {
        ufo1.x -= 5;
      }
    });
    /* ------------Feinde test2------------------------------ */
    ufos2.forEach(function (ufo2) {
      if (!ufo2.hit) {
        ufo2.x -= 5;
      }
    });
    /* ------------Feinde test3------------------------------ */
    ufos3.forEach(function (ufo3) {
      if (!ufo3.hit) {
        ufo3.x -= 5;
      }
    });
    /* --------------------------------------------------------- */
    shots.forEach(function (shot) {
      shot.x += 15;
    });
    /* ---------------------Laser Upgrade--------------------------- */
    shots1.forEach(function (shot1) {
      shot1.x += 15;
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
  /* -------------------------Test1 neue Feinde-------------------------------------- */
  const createUfos1 = () => {
    if (score > 2000) {
      let ufo1 = {
        x: 800,
        y: Math.random() * 500,
        width: 100,
        height: 40,
        src: "/img/ufo4.png",
        img: new Image(),
      };
      ufo1.img.src = ufo1.src;
      ufos.push(ufo1);
    }
  };
  /* -------------------------Test2 neue Feinde-------------------------------------- */
  const createUfos2 = () => {
    if (score > 4000) {
      let ufo2 = {
        x: 800,
        y: Math.random() * 500,
        width: 100,
        height: 40,
        src: "/img/fighter.png",
        img: new Image(),
      };
      ufo2.img.src = ufo2.src;
      ufos.push(ufo2);
    }
  };
  /* -------------------------Test3 neue Feinde-------------------------------------- */
  const createUfos3 = () => {
    if (score > 8000) {
      let ufo3 = {
        x: 800,
        y: Math.random() * 500,
        width: 100,
        height: 40,
        src: "/img/ufo5.png",
        img: new Image(),
      };
      ufo3.img.src = ufo3.src;
      ufos.push(ufo3);
    }
  };
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
        rocket.img.src = "img/boom1.png";

        ufos = ufos.filter((u) => u !== ufo);
        gameOver();
        fireEvent("kolision");
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
          ufo.img.src = "img/boom5.png";

          increaseScore(10);
          setTimeout(() => {
            ufos = ufos.filter((u) => u !== ufo);
          }, 2000);
          fireEvent("treffer");
        }
      });
    });
  };
  /* ------------Feinde test1---------------------------------------------- */

  const checkForCollision1 = () => {
    ufos1.forEach(function (ufo1) {
      // Kontrollieren, ob UFO mit Rakete kollidiert
      if (
        rocket.x + rocket.width > ufo1.x &&
        rocket.y + rocket.height > ufo1.y &&
        rocket.x < ufo1.x &&
        rocket.y < ufo1.y + ufo1.height
      ) {
        rocket.img.src = "img/boom3.png";

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

          increaseScore(5);
          setTimeout(() => {
            ufos1 = ufos1.filter((u) => u !== ufo1);
          }, 2000);
        }
      });
    });
  };
  /* ------------Feinde test2---------------------------------------------- */

  const checkForCollision2 = () => {
    ufos2.forEach(function (ufo2) {
      // Kontrollieren, ob UFO mit Rakete kollidiert
      if (
        rocket.x + rocket.width > ufo2.x &&
        rocket.y + rocket.height > ufo2.y &&
        rocket.x < ufo2.x &&
        rocket.y < ufo2.y + ufo2.height
      ) {
        rocket.img.src = "/img/boom2.png";

        ufos2 = ufos2.filter((u) => u !== ufo2);
        gameOver();
      }
      shots.forEach(function (shot) {
        if (
          shot.x + shot.width > ufo2.x &&
          shot.y + shot.height > ufo2.y &&
          shot.x < ufo2.x &&
          shot.y < ufo2.y + ufo2.height
        ) {
          ufo2.hit = true;
          ufo2.img.src = "img/boom2.png";

          increaseScore(15);
          setTimeout(() => {
            ufos2 = ufos2.filter((u) => u !== ufo2);
          }, 2000);
        }
      });
    });
  };
  /* ------------Feinde test3---------------------------------------------- */

  const checkForCollision3 = () => {
    ufos3.forEach(function (ufo3) {
      // Kontrollieren, ob UFO mit Rakete kollidiert
      if (
        rocket.x + rocket.width > ufo3.x &&
        rocket.y + rocket.height > ufo3.y &&
        rocket.x < ufo3.x &&
        rocket.y < ufo3.y + ufo3.height
      ) {
        rocket.img.src = "img/boom3.png";

        ufos3 = ufos3.filter((u) => u !== ufo3);
        gameOver();
      }
      shots.forEach(function (shot) {
        // Kontrollieren, ob Laser mit Rakete kollidiert
        if (
          shot.x + shot.width > ufo3.x &&
          shot.y + shot.height > ufo3.y &&
          shot.x < ufo3.x &&
          shot.y < ufo3.y + ufo3.height
        ) {
          ufo3.hit = true;
          ufo3.img.src = "img/boom3.png";

          increaseScore(5);
          setTimeout(() => {
            ufos3 = ufos3.filter((u) => u !== ufo3);
          }, 2000);
        }
      });
    });
  };
  /* --------------------------------------------------------------------- */

  /* Space Taste */
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
      fireEvent("laser");
    }
  };
  /* ----------------Laser Shot UPGRADE------------------------------- */
  const checkForShoot1 = () => {
    if (KeyStates.Space && score > 10000) {
      let shot1 = {
        x: rocket.x + 110,
        y: rocket.y + 22,
        width: 26,
        height: 16,
        src: "img/shot1.png",
        img: new Image(),
      };
      shot1.img.src = shot1.src;

      shots.push(shot1);
      fireEvent("laser1");
    }
  };

  /* -------------------------Gehe zu Commponente 3 ?????-------------------------- */

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
    intervals.update = setInterval(update, 800 / 25); /* schneller Fliegen */
    intervals.createUfos = setInterval(createUfos, 1000); /*feinde Öffter*/
    intervals.createUfos1 = setInterval(createUfos1, 1200); /*feinde Öffter*/
    intervals.createUfos2 = setInterval(createUfos2, 800); /*feinde Öffter*/
    intervals.createUfos3 = setInterval(createUfos3, 1300); /*feinde Öffter*/
    intervals.checkForCollision = setInterval(checkForCollision, 1000 / 25);
    intervals.checkForCollision1 = setInterval(checkForCollision1, 1000 / 25);
    intervals.checkForCollision2 = setInterval(checkForCollision2, 1000 / 25);
    intervals.checkForCollision3 = setInterval(checkForCollision3, 1000 / 25);
    intervals.checkForShoot = setInterval(checkForShoot, 1000 / 10);
    /* ---------------SCHUSS UPGRADE------------------------------------------ */
    intervals.checkForShoot1 = setInterval(checkForShoot1, 1000 / 20);
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
    ufos1 = []; /* feind test */
    ufos2 = []; /* feind test */
    shots = [];
    shots1 = [];
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
