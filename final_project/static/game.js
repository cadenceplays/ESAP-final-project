//timer functions
import{
    startTimer,
    stopTimer
} from "./timer.js"

//global variables
let currentStage = None;
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

function startGame() {
    currentStage = 0;
    startTimer();

    loadStage(currentStage);
}

function loadStage(index) {
    if (index >= captchas.length) {
        completeGame();
        return;
    }

    document.getElementById('stage-count').innerText = `${index + 1} / ${captchas.length}`;
    const container = document.getElementById('captcha-box');
    container.innerHTML = `<h2>${captchas[index].title}</h2>`;

    captchas[index].render(container);
}

function nextStage() {
    currentStage++;
    loadStage(currentStage);
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