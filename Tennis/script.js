var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
console.log(x);
var y = canvas.height / 2;
console.log(y);
var movex = -5;
var movey = -5;
var RadiusBall = 20;
var paddleHeight = 230;
var paddleWidth = 10;
var paddleY = (canvas.height - paddleHeight) / 2;
var topPressed = false;
var bottomPressed = false;
var kol = 0;
var img = new Image();
var score = 0;
var Timer = 0;
document.getElementById('NewGame').addEventListener("click", StartGame);
document.getElementById('ContinueGame').addEventListener("click", ContinueGame);
document.getElementById('Exit').addEventListener("click", ExitGame);
document.getElementById('SaveGame').addEventListener("click", Save);


function drawTimer() {
    ctx.font = "26px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Time: " + Timer, 700, 50);
}

function drawBall() {
    ctx.drawImage(img, x, y);
    img.src = 'earth.png';
}

function drawScore() {
    ctx.font = "26px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 50, 20);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawScore();
    drawTimer();
    drawPaddle();
    x += movex;
    y += movey;
    Timer += 0.01;
    if (y + movey > canvas.height - RadiusBall || y + movey - RadiusBall < 0) {
        movey = -movey;
    }
    if (x + movex > canvas.width - RadiusBall) {
        movex = -movex;
    } else if (x + movex < paddleWidth) {
        if (y > paddleY && y < paddleY + paddleHeight) {
            movex = -movex * 1.3;
            score++;
        } else if (kol < 1) {
            score = Math.round(score);
            Timer = Math.round(Timer);
            var choise = confirm("Game over\n" + "Your score:" + score + "\nTime Played:" + Timer);
            kol++;
            if (confirm) {
                var tr1y = confirm("try again?");
                if (tr1y) {
                    localStorage.setItem("score", score);
                    localStorage.setItem("Timer", Timer);
                    localStorage.setItem("movex", movex);
                    localStorage.setItem("movey", movey);
                    document.getElementById('Menu').style.display = "block";
                    document.location.reload();
                } else if (!tr1y) {
                    document.location.reload();
                }
            }
        }
    }
    if (topPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 7;
    } else if (bottomPressed && paddleY > 0) {
        paddleY -= 7;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 40) {
        topPressed = true;
    } else if (e.keyCode == 38) {
        bottomPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 40) {
        topPressed = false;
    } else if (e.keyCode == 38) {
        bottomPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
        paddleY = relativeY - paddleHeight / 2;
    }
}

function StartGame() {
    document.getElementById('Save').style.display = "block"
    setInterval(draw, 10);
    document.getElementById('Menu').style.display = "none";
}
// document.location.reload();
function Save() {
    localStorage.setItem("score", score);
    localStorage.setItem("Timer", Timer);
    localStorage.setItem("movex", movex);
    localStorage.setItem("movey", movey);
    document.getElementById('Menu').style.display = "block";
    document.location.reload();
}

function ContinueGame() {
    document.getElementById('Menu').style.display = "none";
    console.log(score);
    console.log(Timer);
    score = +localStorage.getItem("score");
    Timer = +localStorage.getItem("Timer");
    movex = +localStorage.getItem("movex");
    movey = +localStorage.getItem("movey");
    setInterval(draw, 10);

}

function ExitGame() {
    window.close('index.html');
}
