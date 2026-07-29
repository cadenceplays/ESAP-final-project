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

const captchaBox = document.getElementById("captcha-box");

captchaBox.innerText = "JavaScript loaded successfully";

//global variables
let currentStage = 0;
const captchas = [
    {id: 1,
    title: "stage 1: prove you're human.",
    render: renderStage1
    },

    {id: 2,
    title: "stage 2: confirm intent.",
    render: renderStage2
    },

    {id: 3,
    title: "stage 3: easy trivia.",
    render: renderStage3
    }
];
function nextStage() {
    currentStage++;
    loadStage(currentStage);
}

function startGame() {
    currentStage = 0;
    startTimer();

    loadStage(currentStage);
}

function loadStage(index) {
    console.log("loading stage")
    if (index >= captchas.length) {
        completeGame();
        return;
    }
    //update header
    document.getElementById('stage-count').innerText = `${index + 1} / ${captchas.length}`;

    const container = document.getElementById('captcha-box');

    container.innerHTML = `<h2>${captchas[index].title}</h2>`;
    console.log("pre-render complete");
    captchas[index].render(container,nextStage);
}



async function completeGame() {
    
    const totalTime = stopTimer;
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

startGame();