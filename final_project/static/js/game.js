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
    },

    {id: 4,
    title: "stage 4: ",
    render: renderStage4
    },

    {id: 5,
    title: "stage 3: easy trivia.",
    render: renderStage5
    },

    {id: 6,
    title: "stage 3: easy trivia.",
    render: renderStage6
    },

    {id: 7,
    title: "stage 3: easy trivia.",
    render: renderStage7
    },

    {id: 8,
    title: "stage 3: easy trivia.",
    render: renderStage8
    },

    {id: 9,
    title: "stage 3: easy trivia.",
    render: renderStage9
    },

    {id: 10,
    title: "stage 3: easy trivia.",
    render: renderStage10
    },

    {id: 11,
    title: "stage 3: easy trivia.",
    render: renderStage11
    },

    {id: 12,
    title: "stage 3: easy trivia.",
    render: renderStage12
    },
    
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
    
    const totalTime = stopTimer();
    const container = document.getElementById('captcha-box');
    
    container.innerHTML = `
        <h2>verification complete!</h2>
        <p>good job, you're not a robot ^^ (....maybe..)</p>
        <p>your time: <strong>${totalTime} seconds</strong></p>
        <div class="submit-form">
            <input type="text" id="username" placeholder="please enter your name here: " maxlength="15">
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

startGame();