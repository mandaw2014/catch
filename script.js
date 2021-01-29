var mousePosition;
var offset = [0, 0];
var isDown = false;

player = document.getElementById("player");
body = document.getElementById("body");
title = document.getElementById("title");

var mouseDown = function(e) {
    isDown = true;
    offset = [
        player.offsetLeft - e.clientY,
        player.offsetTop - e.clientX
    ];
    window.removeEventListener("mousedown", mouseDown, false);
};

window.addEventListener("mousedown", mouseDown, false);

document.addEventListener("mousemove", function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        player.style.left = (mousePosition.x + offset[0]) + "px";
        player.style.top = (mousePosition.y + offset[1]) + "px";
        is_colliding();
        highScore();
    }
}, true);

if (isDown === false) {
    player.addEventListener("click", function() {
        body.style.cursor = "none";
        block.style.display = "block";
        document.getElementById("h3").style.display = "none";
        setTimeout(gameLost, 30000);
        scoreText.style.top = "-58px";
        scoreText.style.display = "block";

        window.setInterval(function () {
            block.style.display = "none";
        }, 30000);
    });
}

var block = document.getElementById("block");
var score = 0;
var highscore = localStorage.getItem("highscore/catch", 0);
var scoreText = document.getElementById("score");
var highScoreText = document.getElementById("highscoreText");
var highScoreNum = document.getElementById("highscore");

function updateScore () {
    score++;
    scoreText.innerText = score;  
}

function highScore () {
    if (highscore != null) {
        if (score > highscore) {
            localStorage.setItem("highscore/catch", score);
        }
    } else {
        localStorage.setItem("highscore/catch", score);
    }

    highScoreNum.innerText = highscore;
}

function moveBlock(){
    block.style.position = 'absolute';
    block.style.top = Math.floor(Math.random() * 90 + 5) + '%';
    block.style.left = Math.floor(Math.random() * 90 + 5) + '%';
}

function gameLost() {
    highScoreText.style.display = "block";
    highScoreNum.style.display = "block";
    setTimeout(Alert, 4000);
}

function Alert() {
    alert("Game Over " + "    Click OK to play again");
    location.reload();
}

var is_colliding = function() {
    var d1_height = player.offsetHeight;
    var d1_width = player.offsetWidth;
    var d1_distance_from_top = player.offsetTop + d1_height;
    var d1_distance_from_left = player.offsetLeft + d1_width;
  
    var d2_height = block.offsetHeight;
    var d2_width = block.offsetWidth;
    var d2_distance_from_top = block.offsetTop + d2_height;
    var d2_distance_from_left = block.offsetLeft + d2_width;
  
    var not_colliding =
      d1_distance_from_top < block.offsetTop ||
      player.offsetTop > d2_distance_from_top ||
      d1_distance_from_left < block.offsetLeft ||
      player.offsetLeft > d2_distance_from_left;

    if (!not_colliding) {
        console.log("collide");
        moveBlock();
        updateScore();
    }

    return !not_colliding;
};
