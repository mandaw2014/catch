var mousePosition;
var offset = [0, 0];
var isDown = false;

player = document.getElementById("player");
body = document.getElementById("body");
title = document.getElementById("title");

// document.body.appendChild(player);

player.addEventListener("mousedown", function(e) {
    isDown = true;
    offset = [
        player.offsetLeft - e.clientY,
        player.offsetTop - e.clientX
    ];
}, true);


document.addEventListener("mousemove", function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        player.style.left = (mousePosition.x + offset[0]) + "px";
        player.style.top = (mousePosition.y + offset[1]) + "px";
    }
}, true);

if (isDown === false) {
    player.addEventListener("click", function() {
        body.style.cursor = "none";
        block.style.display = "block";
        document.getElementById("h3").style.display = "none";
        setTimeout(gameLost, 30000);
    });
}

var block = document.getElementById("block");
var score = 0;
var highscore = localStorage.getItem("highscore/catch", 0);

function highScore () {
    if (highscore != null) {
        if (score > highscore) {
            localStorage.setItem("highscore/catch", score);
        }
    } else {
        localStorage.setItem("highscore/catch", score);
    }
}

function moveBlock(){
    block.style.position = 'absolute';
    block.style.top = Math.floor(Math.random() * 90 + 5) + '%';
    block.style.left = Math.floor(Math.random() * 90 + 5) + '%';
}

moveBlock();

block.addEventListener("mouseenter", function () {
    moveBlock();
    score++;
    highScore();
});

function gameLost() {
    alert("Game Over" + "      Score: " + score + "     Highscore: " + highscore);
    location.reload();
}