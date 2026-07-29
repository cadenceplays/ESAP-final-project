let currentStage = 0;
let startTime = null;
let timerInterval = null;

// TODO: randomize order of catchpas

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
    startTime = Date.now();

    // update live timer display every 100ms
    timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        document.getElementById('timer-display').innerText = `${elapsed}s`;
    }, 100);

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
    clearInterval(timerInterval);
    const totalTime = parseFloat(((Date.now() - starTime) / 1000).toFixed(2));

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

// evil button that doesnt want to touch you
function renderStage1(container) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>check the box to verify that you are NOT a robot:</p>
        <div style="height: 200px; position: relative;" id="runaway-area">
            <button id="runaway-btn" style="position": absolute; top: 80px; left: 80px;">i am human</button>
        </div>
    `;
    
    container.appendChild(wrapper);

    const btn = document.getElementById('runaway-btn');
    const area = document.getElementById('runaway-area');

    btn.addEventListener('mouseover', () => {
        const maxX = area.clientWidth - btn.clientWidth;
        const maxY = area.clientHeight - btn.clientHeight;
        btn.style.left = `${Math.floor(Math.random() * maxX)}px`;
        btn.style.top = `${Math.floor(Math.random() * maxY)}px`;
    });

    btn.addEventListener('click', () => {
        nextStage();
    });
}

// are you sure?
// 'click on me if you're not not not not not not a robot' --> if you click on it, you fail lmao
function renderStage2(container) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>are you <em>ABSOLUTELY SURE</em> you're not not not not not not a robot????</p>
        <button id="no-btn">no</button>
        <button id="yes-btn">yes, i'm pretty sure</button>
    `;

    container.appendChild(wrapper);

    document.getElementById('no-btn').addEventListener('click', () => {
        alert(".......are you sure?");
        nextStage();
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        alert("nice try clanker");
        startGame();
    });
}

// evil and scary trivia
function renderStage3(container) {
    // TODO
}

// really absurd math problem, text based entry
function renderStage4(container) {
}

// select waldo from a really large image
// wait for loading bar for a really long time (click on small word to resolve)
// rotate object to fit reference (multiple rounds of this)
// tell if a text is ai generated or not
// write an essay about how cool and amazing the devs are
// select all squares with __
// classic ml test
// win connect 4 game against ai
function renderStage5(container) {
    const board = document.querySelector(".board");
    const status = document.querySelector(".status");
    const winner = document.querySelector(".winner");

    let rows = 6;
    let cols = 7; // SIX SEVENNNN

    function createGameBoard() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const disc = document.createElement("div");
                disc.classList.add("cell");
                disc.setAttribute("data-col", c);
                disc.setAttribute("date-row", r);
                board.appendChild(disc);
            }
        }
    }

    let currPlayer = "red";
    let isGameOver = false;

    let gameBoard = Array.from({ length: rows }, () => Array(cols).fill(null));

    board.addEventListener("click", function (e) {
        status.classList.remove()
    });

    function checkWin() {
        
    }
}
// throughout every stage, remember to feed your pet 
// wack a mole
// clicker test
// typing test 
// enter the text in the image but its in simplified chinese
// click the slider in the right spot in time (gets harder/faster)
// evil_math sol: 78 (you turn the numbers upside down, it reads 86 _ 88, 89. 90, 91)