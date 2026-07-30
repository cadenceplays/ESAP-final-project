console.log("game.js is running");
//timer functions
import{
    startTimer,
    stopTimer
} from "./timer.js"

//import captchas
import { renderStage1 } from "./captchas/evilButton1.js";
import { renderStage2 } from "./captchas/notNot2.js";
import { renderStage3 } from "./captchas/evilMath3.js";
import { renderStage4 } from "./captchas/fakeLoad4.js";
import { renderStage5 } from "./captchas/gassDevs5.js";
import { renderStage6 } from "./captchas/chineseFun6.js";
import { renderStage7 } from "./captchas/evilSlider7.js";
import { renderStage8 } from "./captchas/rotateImg8.js";
import { renderStage9 } from "./captchas/aivHuman9.js";
import { renderStage10 } from "./captchas/ticTacToe10.js";
import { renderStage11 } from "./captchas/whereWaldo11.js";
import { renderStage12 } from "./captchas/connectFour12.js";

const captchaBox = document.getElementById("captcha-box");

captchaBox.innerText = "JavaScript loaded successfully";

//global variables
let currentStage = 0;
let activeCaptchas = [];

const captchas = [
    { id: 1, title: "Prove You're Human", render: renderStage1 },
    { id: 2, title: "Confirm Intent", render: renderStage2 },
    { id: 3, title: "Easy Trivia", render: renderStage3 },
    { id: 4, title: "Browser Verification", render: renderStage4 },
    { id: 5, title: "Dev Appreciation", render: renderStage5 },
    { id: 6, title: "Chinese Characters", render: renderStage6 },
    { id: 7, title: "Precision Slider", render: renderStage7 },
    { id: 8, title: "Alignment", render: renderStage8 },
    { id: 9, title: "AI Detection", render: renderStage9 },
    { id: 10, title: "Final Boss", render: renderStage10 },
    { id: 11, title: "Calibration", render: renderStage11 },
    { id: 12, title: "Final Gate", render: renderStage12 }
];

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled; 
}

function nextStage(failstage = false) {
    if (failstage){
        window.location.replace("/");
    }
    currentStage++;
    loadStage(currentStage);
}

function startGame() {
    currentStage = 0;
    activeCaptchas = shuffleArray(captchas);
    startTimer();
    loadStage(currentStage);
}

function failGame() {
    alert("nice try, clanker!");
    startGame();
}

function loadStage(index) {
    console.log("loading stage")
    if (index >= activeCaptchas.length) {
        completeGame();
        return;
    }
    
    // Update Stage Counter
    const stageDisplay = document.getElementById('stage-count');
    if (stageDisplay) {
        stageDisplay.innerText = `${index + 1} / ${activeCaptchas.length}`;
    }

    const container = document.getElementById('captcha-box');
    container.innerHTML = `<h2>${activeCaptchas[index].title}</h2>`;
    
    // Render current stage & pass nextStage + failGame callbacks
    activeCaptchas[index].render(container, nextStage, failGame);
}

async function completeGame() {
    
    const totalTime = stopTimer();
    const container = document.getElementById('captcha-box');
    
    container.innerHTML = `
        <h2>verification complete!</h2>
        <p>good job, you're not a robot ^^ (....maybe..)</p>
        <p>your time: <strong>${totalTime} seconds</strong></p>
        <div class="submit-form">
            <input type="text" id="username" placeholder="please enter your name here: " maxlength="15>
            <button id="submit-btn">submit high score</button>
        </div>
    `;

    document.getElementById('submit-btn').addEventListener('click', async() => {
        const name = document.getElementById('username').value || 'anon';

        await fetch('/api/submit-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: name, time: totalTime })
        });

        window.location.href = '/leaderboard';
    })
}

window.addEventListener('DOMContentLoaded', startGame);

function startPetMech() {
    let petHunger = 100;
    const petBar = document.getElementById('pet-hunger-bar');
    setInterval(() => {
        petHunger -= 2;
        if (petBar) petBar.style.width = `${petHunger}%`;

        if (petHunger <= 0) {
            alert("your pet starved to death! wtf man >:(");
            startGame();
        }
    }, 1000);
}