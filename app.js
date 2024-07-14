let gameSeq = [];
let userSeq = [];
let allScores = [];

let started = false;
let level = 0;

let btns = ["yellow","red","purple","green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(randBtn);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key to start.`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        highestScore(level);
        reset();
    }
}

function btnPress() {
    let btn = this;   // jo button user press krega woh button
    userFlash(btn);
    userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function highestScore(currScore) {
    allScores.push(currScore);
    console.log(allScores);
    let highestScore = Math.max(...allScores);
    document.querySelector("span").innerText = highestScore;
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}