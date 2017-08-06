// originX and originY compose the starting position of the dinosaur
// they are also used as the anchor points from which the dinosaur is drawn
var originX = 40;
var originY = 315; // 315
// zeroX and zeroY simply reference the original values of originX and originY
// they are used to reset the position of the dinosaur
var zeroX = originX;
var zeroY = originY;
// this game only allows for one enemy at the moment
var obstacle1X = randomIntFromInterval(480, 600);
var obstacleSpeed = 2;
// a `unit` is a single drawing block in this game
// the dinosaur is drawn using these units as the basic pixel size in a way
var unit = 3;
var jumpHeight = unit * 35;
// variables to control the switching between between left and right legs
var cycleCounter = 0;
var cycleCounterLimit = 3;
var currentDinoFootingLeft;
// the lower the refreshDelay, the faster the frame refresh speed
var refreshDelay = 15;
var score = 0;
// the gameInterval contains general game object, clear interval to stop game
var gameInterval;
var scoreLimit = 6;
var canvas = document.getElementById('myCanvas');
// store the 2d rendering context, tool used to paint on canvas
var ctx = canvas.getContext('2d');
// default position of the dinosaur at beginning of game
drawDinoResting();
function draw() {
    // drawing code
    animateDino();
    animateObstacle();
}
window.addEventListener('touchstart', function () {
    // the user touched the screen!
    if (gameInterval) {
        if (originY === zeroY) {
            performJump();
        }
    }
    else {
        gameInterval = setInterval(draw, refreshDelay);
    }
});
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 27:
            // escape key
            confirmReset();
            break;
        case 37:
            // left arrow
            originX -= unit * 2;
            break;
        case 38:
            // up arrow
            if (originY === zeroY) {
                performJump();
            }
            break;
        case 39:
            // right arrow
            originX += unit * 2;
            break;
        case 40:
            // down arrow
            confirmReset();
            break;
    }
};
function confirmReset() {
    if (gameInterval) {
        if (confirm('Want to restart?')) {
            performRestart();
        }
    }
    else {
        gameInterval = setInterval(draw, refreshDelay);
    }
}
function animateObstacle() {
    if (obstacle1X < -20) {
        obstacle1X = randomIntFromInterval(480, 600);
        score++;
        if (score === scoreLimit) {
            performRestart();
            drawWinMessage();
        }
    }
    else {
        obstacle1X -= obstacleSpeed;
    }
}
function animateDino() {
    if (cycleCounter < cycleCounterLimit) {
        cycleCounter++;
    }
    else {
        if (currentDinoFootingLeft) {
            drawDinoLeft();
        }
        else {
            drawDinoRight();
        }
        currentDinoFootingLeft = !currentDinoFootingLeft;
        cycleCounter = 0;
    }
}
function performRestart() {
    score = 0;
    obstacle1X = randomIntFromInterval(480, 600);
    clearInterval(gameInterval);
    gameInterval = null;
    originX = zeroX;
    originY = zeroY;
    drawDinoResting();
}
function performJump() {
    var i = 0, howManyTimes = 180;
    function f() {
        originY = zeroY - jumpHeight * Math.sin(i * Math.PI / 180);
        i += 1;
        if (i <= howManyTimes) {
            setTimeout(f, 1);
        }
    }
    f();
}
function drawStartMessage() {
    ctx.font = "15px Arial";
    ctx.fillText('Down-key to begin, Up-key to jump, ' + scoreLimit + ' points to win!', 50, 50);
}
function drawWinMessage() {
    ctx.font = "30px Arial";
    ctx.fillText('YOU WIN!', 100, 100);
}
function drawName() {
    ctx.font = "15px Arial";
    ctx.fillText('조셉', originX + unit * 7, originY - unit * 26);
}
function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillText(score, 50, 50);
}
function drawObstacles() {
    ctx.font = "30px Arial";
    ctx.fillText('최수강!', obstacle1X, zeroY - 15);
}
function drawDinoResting() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(originX - unit * 6, originY);
    ctx.rect(originX, originY, unit * 2, unit);
    ctx.rect(originX + unit * 5, originY, unit * 2, unit);
    ctx.rect(originX, originY - unit, unit, unit);
    ctx.rect(originX + unit * 5, originY - unit, unit, unit);
    ctx.rect(originX, originY - unit * 2, unit * 2, unit);
    ctx.rect(originX + unit * 5, originY - unit * 2, unit, unit);
    ctx.rect(originX, originY - unit * 3, unit * 3, unit);
    ctx.rect(originX + unit * 4, originY - unit * 3, unit * 2, unit);
    ctx.rect(originX - unit, originY - unit * 4, unit * 7, unit);
    ctx.rect(originX - unit, originY - unit * 5, unit * 8, unit);
    ctx.rect(originX - unit * 4, originY - unit * 6, unit * 12, unit);
    ctx.rect(originX - unit * 5, originY - unit * 7, unit * 14, unit);
    ctx.rect(originX - unit * 6, originY - unit * 8, unit * 15, unit);
    ctx.rect(originX - unit * 6, originY - unit * 9, unit * 15, unit);
    ctx.rect(originX - unit * 6, originY - unit * 10, unit * 3, unit);
    ctx.rect(originX, originY - unit * 10, unit * 9, unit);
    ctx.rect(originX + unit * 10, originY - unit * 10, unit, unit);
    ctx.rect(originX - unit * 6, originY - unit * 11, unit * 2, unit);
    ctx.rect(originX + unit, originY - unit * 11, unit * 10, unit);
    ctx.rect(originX - unit * 6, originY - unit * 12, unit, unit);
    ctx.rect(originX + unit * 3, originY - unit * 12, unit * 6, unit);
    ctx.rect(originX - unit * 6, originY - unit * 13, unit, unit);
    ctx.rect(originX + unit * 5, originY - unit * 13, unit * 4, unit);
    ctx.rect(originX + unit * 6, originY - unit * 14, unit * 8, unit);
    ctx.rect(originX + unit * 6, originY - unit * 15, unit * 5, unit);
    ctx.rect(originX + unit * 6, originY - unit * 16, unit * 5, unit);
    ctx.rect(originX + unit * 6, originY - unit * 17, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 18, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 19, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 20, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 21, unit * 2, unit);
    ctx.rect(originX + unit * 9, originY - unit * 21, unit * 8, unit);
    ctx.rect(originX + unit * 6, originY - unit * 22, unit * 2, unit);
    ctx.rect(originX + unit * 8, originY - unit * 22, unit * 9, unit);
    ctx.rect(originX + unit * 7, originY - unit * 23, unit * 8, unit);
    drawObstacles();
    drawName();
    // drawScore();
    drawStartMessage();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
}
function drawDinoLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(originX - unit * 6, originY);
    ctx.rect(originX, originY, unit * 2, unit);
    // ctx.rect(originX+unit*5, originY, unit*2, unit);
    ctx.rect(originX, originY - unit, unit, unit);
    // ctx.rect(originX+unit*5, originY-unit, unit, unit);
    ctx.rect(originX, originY - unit * 2, unit * 2, unit);
    ctx.rect(originX + unit * 5, originY - unit * 2, unit * 2, unit);
    ctx.rect(originX, originY - unit * 3, unit * 3, unit);
    ctx.rect(originX + unit * 4, originY - unit * 3, unit * 2, unit);
    ctx.rect(originX - unit, originY - unit * 4, unit * 7, unit);
    ctx.rect(originX - unit, originY - unit * 5, unit * 8, unit);
    ctx.rect(originX - unit * 4, originY - unit * 6, unit * 12, unit);
    ctx.rect(originX - unit * 5, originY - unit * 7, unit * 14, unit);
    ctx.rect(originX - unit * 6, originY - unit * 8, unit * 15, unit);
    ctx.rect(originX - unit * 6, originY - unit * 9, unit * 15, unit);
    ctx.rect(originX - unit * 6, originY - unit * 10, unit * 3, unit);
    ctx.rect(originX, originY - unit * 10, unit * 9, unit);
    ctx.rect(originX + unit * 10, originY - unit * 10, unit, unit);
    ctx.rect(originX - unit * 6, originY - unit * 11, unit * 2, unit);
    ctx.rect(originX + unit, originY - unit * 11, unit * 10, unit);
    ctx.rect(originX - unit * 6, originY - unit * 12, unit, unit);
    ctx.rect(originX + unit * 3, originY - unit * 12, unit * 6, unit);
    ctx.rect(originX - unit * 6, originY - unit * 13, unit, unit);
    ctx.rect(originX + unit * 5, originY - unit * 13, unit * 4, unit);
    ctx.rect(originX + unit * 6, originY - unit * 14, unit * 8, unit);
    ctx.rect(originX + unit * 6, originY - unit * 15, unit * 5, unit);
    ctx.rect(originX + unit * 6, originY - unit * 16, unit * 5, unit);
    ctx.rect(originX + unit * 6, originY - unit * 17, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 18, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 19, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 20, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 21, unit * 2, unit);
    ctx.rect(originX + unit * 9, originY - unit * 21, unit * 8, unit);
    ctx.rect(originX + unit * 6, originY - unit * 22, unit * 2, unit);
    ctx.rect(originX + unit * 8, originY - unit * 22, unit * 9, unit);
    ctx.rect(originX + unit * 7, originY - unit * 23, unit * 8, unit);
    drawObstacles();
    drawScore();
    drawName();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
}
function drawDinoRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(originX - unit * 6, originY);
    // ctx.rect(originX, originY, unit*2, unit);
    ctx.rect(originX + unit * 5, originY, unit * 2, unit);
    // ctx.rect(originX, originY-unit, unit, unit);
    ctx.rect(originX + unit * 5, originY - unit, unit, unit);
    ctx.rect(originX, originY - unit * 2, unit * 2, unit);
    ctx.rect(originX + unit * 5, originY - unit * 2, unit, unit);
    ctx.rect(originX, originY - unit * 3, unit * 3, unit);
    ctx.rect(originX + unit * 4, originY - unit * 3, unit * 2, unit);
    ctx.rect(originX - unit, originY - unit * 4, unit * 7, unit);
    ctx.rect(originX - unit, originY - unit * 5, unit * 8, unit);
    ctx.rect(originX - unit * 4, originY - unit * 6, unit * 12, unit);
    ctx.rect(originX - unit * 5, originY - unit * 7, unit * 14, unit);
    ctx.rect(originX - unit * 6, originY - unit * 8, unit * 15, unit);
    ctx.rect(originX - unit * 6, originY - unit * 9, unit * 15, unit);
    ctx.rect(originX - unit * 6, originY - unit * 10, unit * 3, unit);
    ctx.rect(originX, originY - unit * 10, unit * 9, unit);
    ctx.rect(originX + unit * 10, originY - unit * 10, unit, unit);
    ctx.rect(originX - unit * 6, originY - unit * 11, unit * 2, unit);
    ctx.rect(originX + unit, originY - unit * 11, unit * 10, unit);
    ctx.rect(originX - unit * 6, originY - unit * 12, unit, unit);
    ctx.rect(originX + unit * 3, originY - unit * 12, unit * 6, unit);
    ctx.rect(originX - unit * 6, originY - unit * 13, unit, unit);
    ctx.rect(originX + unit * 5, originY - unit * 13, unit * 4, unit);
    ctx.rect(originX + unit * 6, originY - unit * 14, unit * 8, unit);
    ctx.rect(originX + unit * 6, originY - unit * 15, unit * 5, unit);
    ctx.rect(originX + unit * 6, originY - unit * 16, unit * 5, unit);
    ctx.rect(originX + unit * 6, originY - unit * 17, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 18, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 19, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 20, unit * 11, unit);
    ctx.rect(originX + unit * 6, originY - unit * 21, unit * 2, unit);
    ctx.rect(originX + unit * 9, originY - unit * 21, unit * 8, unit);
    ctx.rect(originX + unit * 6, originY - unit * 22, unit * 2, unit);
    ctx.rect(originX + unit * 8, originY - unit * 22, unit * 9, unit);
    ctx.rect(originX + unit * 7, originY - unit * 23, unit * 8, unit);
    drawObstacles();
    drawScore();
    drawName();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function zoomOutMobile() {
    var viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        // zooms out really far, should reveal the entire website
        viewport.content = "initial-scale=0.1";
        // reset the width of the viewport to size of canvas
        viewport.content = "width=480";
    }
}
// perform rescaling of website width for better mobile experience
zoomOutMobile();
