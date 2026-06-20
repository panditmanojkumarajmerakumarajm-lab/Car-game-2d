const player = document.getElementById("player");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const startScreen = document.getElementById("startScreen");
const startGameBtn = document.getElementById("startGame");

const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const scoreValue = document.getElementById("scoreValue");

const enemies = document.querySelectorAll(".enemy");

const lanePos = ["15%", "43%", "71%"];

let playerLane = 1;
let score = 0;
let running = false;

player.style.left = lanePos[playerLane];

startGameBtn.onclick = () => {
    startScreen.style.display = "none";
    running = true;
    requestAnimationFrame(updateGame);
};

leftBtn.onclick = () => {
    if (!running) return;

    if (playerLane > 0) {
        playerLane--;
        player.style.left = lanePos[playerLane];
    }
};

rightBtn.onclick = () => {
    if (!running) return;

    if (playerLane < 2) {
        playerLane++;
        player.style.left = lanePos[playerLane];
    }
};

function updateGame() {

    if (!running) return;

    enemies.forEach(enemy => {

        let y = parseFloat(enemy.dataset.y || enemy.offsetTop);
        y += 6;

        enemy.dataset.y = y;
        enemy.style.top = y + "px";

        if (y > window.innerHeight) {

            y = -150;

            enemy.dataset.y = y;
            enemy.style.top = y + "px";

            let lane = Math.floor(Math.random() * 3);
            enemy.dataset.lane = lane;
            enemy.style.left = lanePos[lane];

            score++;
            scoreValue.innerText = score;
        }

        if (
            enemy.dataset.lane == playerLane &&
            y > window.innerHeight - 180 &&
            y < window.innerHeight - 70
        ) {
            running = false;
            finalScore.innerText = "Score : " + score;
            gameOver.style.display = "flex";
        }

    });

    requestAnimationFrame(updateGame);
}