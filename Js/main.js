var player1;
var player2;
var ball;
var table;
var simon;
var loop;
var gamePaused = false;
var simonSays = false;
var simonStarted = false;
var timePaused = 3;

const keysPressed = new Map([]);
const collisioning = new Map([]);
collisioning.set('middle', true);
const initialBallSpeed = 4;
const maxBallSpeed = 20;
const playerSpeed = 5;
const playerHeight = 150;
const playerWidth = 20;
const beep = new Audio('Sounds/beep.ogg');
beep.volume = 1;
beep.playbackRate = 3;

const finishSimon = () => {
  simonSays = false;
  simonStarted = false;
}

const initializeGame = () => {
  table = new Table({
    id: 'table',
    width: window.innerWidth,
    height: window.innerHeight,
    x: 0,
    y: 0,
  });
  player1 = new Player(table.canvas, {
    initialX: 10,
    initialY: table.canvas.height / 2 - 125,
    height: playerHeight,
    width: playerWidth,
    speed: playerSpeed,
  });
  player2 = new Player(table.canvas, {
    initialX: table.canvas.width - 30,
    initialY: table.canvas.height / 2 - 125,
    height: playerHeight,
    width: playerWidth,
    speed: playerSpeed,
  });
  ball = new Ball(table.canvas, {
    initialX: table.canvas.width / 2,
    initialY: table.canvas.height / 2,
    height: 20,
    width: 20,
    vSpeed: 1,
    hSpeed: initialBallSpeed,
  });
  simon = new Simon(document.body, finishSimon);
  window.addEventListener('keydown', (e) => {
    keysPressed.set(e.code, true);
  });
  window.addEventListener('keyup', (e) => {
    keysPressed.set(e.code, false);
  });
  loop = requestAnimationFrame(gameLoop);
};

const gameLoop = () => {
  table.drawTable();
  if (!gamePaused && !simonSays) {
    checkMoves();
    moveBall();
  } 
  player1.drawPlayer();
  player2.drawPlayer();
  ball.drawBall();
  if (simonSays && !simonStarted) {
    simonStarted = true;
    simon.start();
  }
  else if (gamePaused) {
    table.drawTimer(timePaused);
  }
  loop = requestAnimationFrame(gameLoop);
};

checkMoves = () => {
  if (keysPressed.get('KeyW') && !keysPressed.get('KeyS')) {
    player1.moveUp();
  }
  if (keysPressed.get('KeyS') && !keysPressed.get('KeyW')) {
    player1.moveDown();
  }
  if (keysPressed.get('ArrowUp') && !keysPressed.get('ArrowDown')) {
    player2.moveUp();
  }
  if (keysPressed.get('ArrowDown') && !keysPressed.get('ArrowUp')) {
    player2.moveDown();
  }
};

moveBall = () => {
  if (ball.x < (table.canvas.width / 2) + 10 &&
    ball.x + ball.width > table.canvas.width / 2) {
    !collisioning.get('middle') && (simonSays = true);
    collisioning.set('middle', true);
  } else {
    collisioning.set('middle', false);
  }
  if (
    ball.x < player2.x + player2.width &&
    ball.x + ball.width > player2.x &&
    ball.y < player2.y + player2.height &&
    ball.y + ball.height > player2.y
  ) {
    !collisioning.get('player2') && (ball.hSpeed = Math.abs(ball.hSpeed) >= maxBallSpeed ? maxBallSpeed : ball.hSpeed * -1.05);
    !collisioning.get('player2') && beep.play();
    collisioning.set('player2', true);
  } else {
    collisioning.set('player2', false);
  }
  if (
    player1.x < ball.x + ball.width &&
    player1.x + player1.width > ball.x &&
    player1.y < ball.y + ball.height &&
    player1.y + player1.height > ball.y
  ) {
    !collisioning.get('player1') && (ball.hSpeed = Math.abs(ball.hSpeed) >= maxBallSpeed ? maxBallSpeed : ball.hSpeed * -1.05);
    !collisioning.get('player1') && beep.play();
    collisioning.set('player1', true);
  } else {
    collisioning.set('player1', false);
  }
  if (ball.y + ball.width >= table.canvas.height || ball.y <= 0) {
    ball.vSpeed *= -1;
  }
  if (ball.x > table.canvas.width) {
    table.score[0] += 1;
    ball.x = table.canvas.width / 2;
    gamePaused = true;
    collisioning.set('middle', true);
    simon.max = 1;
    const timeout = setInterval(() => {
      timePaused -= 1;
      if (timePaused === 0) {
        gamePaused = false;
        timePaused = 3;
        ball.hSpeed = Math.floor(Math.random() * 2) + 1 === 1 ? -initialBallSpeed : initialBallSpeed;
        clearInterval(timeout);
      }
    }, 1000);
  }
  if (ball.x + ball.width < 0) {
    table.score[1] += 1;
    ball.x = table.canvas.width / 2;
    gamePaused = true;
    collisioning.set('middle', true);
    simon.max = 1;
    const timeout = setInterval(() => {
      timePaused -= 1;
      if (timePaused === 0) {
        gamePaused = false;
        timePaused = 3;
        ball.hSpeed = Math.floor(Math.random() * 2) + 1 === 1 ? -initialBallSpeed : initialBallSpeed;
        clearInterval(timeout);
      }
    }, 1000);
  }
  ball.moveBall();
};


initializeGame();
gameLoop();
