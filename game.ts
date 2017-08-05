let originX: number = 40;
let originY: number = 315; // 315

const zeroX: number = originX;
const zeroY: number = originY;

let obstacle1X: number = randomIntFromInterval(480, 600);
let obstacleSpeed: number = 2;

let unit: number = 3; // blocks composing the dino
let jumpHeight: number = unit*35;

const upperLimitY: number = originY - jumpHeight; // 315
const lowerLimitY: number = originY; // 315

let cycleCounter: number = 0;
let cycleCounterLimit: number = 3;
let currentDinoFootingLeft: boolean;

let frameRate: number = 15;
let score: number = 0;
let gameInterval: any;

let canvas: any = document.getElementById('myCanvas');
// store the 2d rendering context, tool used to paint on canvas
let ctx: any = canvas.getContext('2d');

// default position of the dinosaur at beginning of game
drawDinoResting();

function draw() {
  // drawing code
  if (cycleCounter < cycleCounterLimit) {
    cycleCounter++;
  } else {
    if (currentDinoFootingLeft) {
      drawDinoLeft();
    } else {
      drawDinoRight();
    }
    currentDinoFootingLeft = !currentDinoFootingLeft;
    cycleCounter = 0;
  }
  if (obstacle1X < -20) {
    obstacle1X = randomIntFromInterval(480, 600);
    score++;
    if (score === 6) {
      performRestart();
      drawWinMessage();
    }
  } else {
    obstacle1X -= obstacleSpeed;
  }
}

window.addEventListener('touchstart', function() {
  // the user touched the screen!
  if (gameInterval) {
    if (originY === lowerLimitY) {
      performJump();
    }
  } else {
    gameInterval = setInterval(draw, frameRate);
  }
});

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      // left arrow
      originX -= unit*2;
      break;
    case 38:
      // up arrow
      if (originY === lowerLimitY) { performJump(); }
      break;
    case 39:
      // right arrow
      originX += unit*2;
      break;
    case 40:
      // down arrow
      if (gameInterval) {
        if (confirm('Want to restart?')) { performRestart(); }
      } else {
        gameInterval = setInterval(draw, frameRate);
      }

      break;
  }
};

function performRestart() {
  score = 0;
  clearInterval(gameInterval);
  gameInterval = null;
  originX = zeroX;
  originY = zeroY;
  drawDinoResting();
}

function performJump() {
  var i = 0, howManyTimes = 180;
  function f() {
    originY = lowerLimitY - jumpHeight * Math.sin(i * Math.PI / 180);
    i += 1;
    if (i <= howManyTimes){ setTimeout(f, 1); }
  }
  f();
}

function drawStartMessage() {
  ctx.font = "15px Arial";
  ctx.fillText('Down-key to begin, Up-key to jump, 6 points to win!', 50, 50);
}

function drawWinMessage() {
  ctx.font = "30px Arial";
  ctx.fillText('YOU WIN!', 100, 100);
}

function drawName() {
  ctx.font = "15px Arial";
  ctx.fillText('조셉', originX+unit*7, originY-unit*26);
}

function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillText(score, 50, 50);
}

function drawObstacles() {
  ctx.font = "30px Arial";
  ctx.fillText('최수강!', obstacle1X, lowerLimitY-15);
}

function drawDinoResting() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath(originX-unit*6, originY);
  ctx.rect(originX, originY, unit*2, unit);
  ctx.rect(originX+unit*5, originY, unit*2, unit);
  ctx.rect(originX, originY-unit, unit, unit);
  ctx.rect(originX+unit*5, originY-unit, unit, unit);
  ctx.rect(originX, originY-unit*2, unit*2, unit);
  ctx.rect(originX+unit*5, originY-unit*2, unit, unit);
  ctx.rect(originX, originY-unit*3, unit*3, unit);
  ctx.rect(originX+unit*4, originY-unit*3, unit*2, unit);
  ctx.rect(originX-unit, originY-unit*4, unit*7, unit);
  ctx.rect(originX-unit, originY-unit*5, unit*8, unit);
  ctx.rect(originX-unit*4, originY-unit*6, unit*12, unit);
  ctx.rect(originX-unit*5, originY-unit*7, unit*14, unit);
  ctx.rect(originX-unit*6, originY-unit*8, unit*15, unit);
  ctx.rect(originX-unit*6, originY-unit*9, unit*15, unit);
  ctx.rect(originX-unit*6, originY-unit*10, unit*3, unit);
  ctx.rect(originX, originY-unit*10, unit*9, unit);
  ctx.rect(originX+unit*10, originY-unit*10, unit, unit);
  ctx.rect(originX-unit*6, originY-unit*11, unit*2, unit);
  ctx.rect(originX+unit, originY-unit*11, unit*10, unit);
  ctx.rect(originX-unit*6, originY-unit*12, unit, unit);
  ctx.rect(originX+unit*3, originY-unit*12, unit*6, unit);
  ctx.rect(originX-unit*6, originY-unit*13, unit, unit);
  ctx.rect(originX+unit*5, originY-unit*13, unit*4, unit);
  ctx.rect(originX+unit*6, originY-unit*14, unit*8, unit);
  ctx.rect(originX+unit*6, originY-unit*15, unit*5, unit);
  ctx.rect(originX+unit*6, originY-unit*16, unit*5, unit);
  ctx.rect(originX+unit*6, originY-unit*17, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*18, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*19, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*20, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*21, unit*2, unit);
  ctx.rect(originX+unit*9, originY-unit*21, unit*8, unit);
  ctx.rect(originX+unit*6, originY-unit*22, unit*2, unit);
  ctx.rect(originX+unit*8, originY-unit*22, unit*9, unit);
  ctx.rect(originX+unit*7, originY-unit*23, unit*8, unit);
  drawObstacles();
  drawName()
  // drawScore();
  drawStartMessage();
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

function drawDinoLeft() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath(originX-unit*6, originY);
  ctx.rect(originX, originY, unit*2, unit);
  // ctx.rect(originX+unit*5, originY, unit*2, unit);
  ctx.rect(originX, originY-unit, unit, unit);
  // ctx.rect(originX+unit*5, originY-unit, unit, unit);
  ctx.rect(originX, originY-unit*2, unit*2, unit);
  ctx.rect(originX+unit*5, originY-unit*2, unit*2, unit);
  ctx.rect(originX, originY-unit*3, unit*3, unit);
  ctx.rect(originX+unit*4, originY-unit*3, unit*2, unit);
  ctx.rect(originX-unit, originY-unit*4, unit*7, unit);
  ctx.rect(originX-unit, originY-unit*5, unit*8, unit);
  ctx.rect(originX-unit*4, originY-unit*6, unit*12, unit);
  ctx.rect(originX-unit*5, originY-unit*7, unit*14, unit);
  ctx.rect(originX-unit*6, originY-unit*8, unit*15, unit);
  ctx.rect(originX-unit*6, originY-unit*9, unit*15, unit);
  ctx.rect(originX-unit*6, originY-unit*10, unit*3, unit);
  ctx.rect(originX, originY-unit*10, unit*9, unit);
  ctx.rect(originX+unit*10, originY-unit*10, unit, unit);
  ctx.rect(originX-unit*6, originY-unit*11, unit*2, unit);
  ctx.rect(originX+unit, originY-unit*11, unit*10, unit);
  ctx.rect(originX-unit*6, originY-unit*12, unit, unit);
  ctx.rect(originX+unit*3, originY-unit*12, unit*6, unit);
  ctx.rect(originX-unit*6, originY-unit*13, unit, unit);
  ctx.rect(originX+unit*5, originY-unit*13, unit*4, unit);
  ctx.rect(originX+unit*6, originY-unit*14, unit*8, unit);
  ctx.rect(originX+unit*6, originY-unit*15, unit*5, unit);
  ctx.rect(originX+unit*6, originY-unit*16, unit*5, unit);
  ctx.rect(originX+unit*6, originY-unit*17, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*18, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*19, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*20, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*21, unit*2, unit);
  ctx.rect(originX+unit*9, originY-unit*21, unit*8, unit);
  ctx.rect(originX+unit*6, originY-unit*22, unit*2, unit);
  ctx.rect(originX+unit*8, originY-unit*22, unit*9, unit);
  ctx.rect(originX+unit*7, originY-unit*23, unit*8, unit);
  drawObstacles();
  drawScore();
  drawName()
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

function drawDinoRight() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath(originX-unit*6, originY);
  // ctx.rect(originX, originY, unit*2, unit);
  ctx.rect(originX+unit*5, originY, unit*2, unit);
  // ctx.rect(originX, originY-unit, unit, unit);
  ctx.rect(originX+unit*5, originY-unit, unit, unit);
  ctx.rect(originX, originY-unit*2, unit*2, unit);
  ctx.rect(originX+unit*5, originY-unit*2, unit, unit);
  ctx.rect(originX, originY-unit*3, unit*3, unit);
  ctx.rect(originX+unit*4, originY-unit*3, unit*2, unit);
  ctx.rect(originX-unit, originY-unit*4, unit*7, unit);
  ctx.rect(originX-unit, originY-unit*5, unit*8, unit);
  ctx.rect(originX-unit*4, originY-unit*6, unit*12, unit);
  ctx.rect(originX-unit*5, originY-unit*7, unit*14, unit);
  ctx.rect(originX-unit*6, originY-unit*8, unit*15, unit);
  ctx.rect(originX-unit*6, originY-unit*9, unit*15, unit);
  ctx.rect(originX-unit*6, originY-unit*10, unit*3, unit);
  ctx.rect(originX, originY-unit*10, unit*9, unit);
  ctx.rect(originX+unit*10, originY-unit*10, unit, unit);
  ctx.rect(originX-unit*6, originY-unit*11, unit*2, unit);
  ctx.rect(originX+unit, originY-unit*11, unit*10, unit);
  ctx.rect(originX-unit*6, originY-unit*12, unit, unit);
  ctx.rect(originX+unit*3, originY-unit*12, unit*6, unit);
  ctx.rect(originX-unit*6, originY-unit*13, unit, unit);
  ctx.rect(originX+unit*5, originY-unit*13, unit*4, unit);
  ctx.rect(originX+unit*6, originY-unit*14, unit*8, unit);
  ctx.rect(originX+unit*6, originY-unit*15, unit*5, unit);
  ctx.rect(originX+unit*6, originY-unit*16, unit*5, unit);
  ctx.rect(originX+unit*6, originY-unit*17, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*18, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*19, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*20, unit*11, unit);
  ctx.rect(originX+unit*6, originY-unit*21, unit*2, unit);
  ctx.rect(originX+unit*9, originY-unit*21, unit*8, unit);
  ctx.rect(originX+unit*6, originY-unit*22, unit*2, unit);
  ctx.rect(originX+unit*8, originY-unit*22, unit*9, unit);
  ctx.rect(originX+unit*7, originY-unit*23, unit*8, unit);
  drawObstacles();
  drawScore();
  drawName()
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

function randomIntFromInterval(min, max): number {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function zoomOutMobile() {
  var viewport: any = document.querySelector('meta[name="viewport"]');
  if ( viewport ) {
    // zooms out really far, should reveal the entire website
    viewport.content = "initial-scale=0.1";
    // reset the width of the viewport to size of canvas
    viewport.content = "width=480";
  }
}

// perform rescaling of website width for better mobile experience
zoomOutMobile();
