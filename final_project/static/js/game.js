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
import { renderStage11 } from "./captchas/connectFour11.js";
import { renderStage12 } from "./captchas/findDog12.js";
import { renderStage13 } from "./captchas/aiArt13.js";
//import { renderStage14 } from "./captchas/goFast14.js";

//global variables
let currentStage = 0;
let activeCaptchas = [];

//stores all captches in a list of dicts
const captchas = [
    /*{id: 1,
    title: "prove you're human.",
    render: renderStage1
    },

    {id: 2,
    title: "confirm intent.",
    render: renderStage2
    },
    
    {id: 3,
    title: "easy trivia.",
    render: renderStage3
    },

    {id: 4,
    title: "wait for it...",
    render: renderStage4
    },

    {id: 5,
    title: "am i doing a good job?",
    render: renderStage5
    },

    {id: 6,
    title: "in a chinese time of my life",
    render: renderStage6
    },

    {id: 7,
    title: "wait and tap",
    render: renderStage7
    },

    {id: 8,
    title: "you spin me right round",
    render: renderStage8
    },

    {id: 9,
    title: "i am robot?",
    render: renderStage9
    },

    {id: 10,
    title: "tic tac toe",
    render: renderStage10
    },

    {id: 11,
    title: "connect 4",
    render: renderStage11
    },

    {id: 12,
    title: "doggo or muffin?",
    render: renderStage12
    },*/

    {id: 13,
    title: "ai or human made?",
    render: renderStage13
    },

    /*{id: 14,
    title: "magic fingers",
    render: renderStage14
    },*/
    
];
/**
 * Takes in an array then returns a shuffled version of the array
 * 
 *  @param {Array} array - the array you want to be shuffled
 *  @returns {Array} a shuffled version of the input
 * 
 */
function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled; 
}

/**
 * Goes to the next stage 
 * 
 *  @param {boolean} [failstage] - if true, will redirect user to the start page
 * 
 */
function nextStage(failstage = false) {
    if (failstage){
        window.location.replace("/");
    }
    currentStage++;
    loadStage(currentStage);
}

/**
 * Starts the game, setting current stage to zero, shuffling the captchas,
 * loading the first stage, and starting the timer that measures how long
 * the user takes to complete the capcthas 
 * 
 */

function startGame() {
    currentStage = 0;
    activeCaptchas = shuffleArray(captchas);
    startTimer();
    loadStage(currentStage);
}

/**
 * plays an alert and then restarts the player if they mess up on 
 * a captcha
 * 
 */
function failGame() {
    alert("nice try, clanker!");
    startGame();
}
/**
 * loads the next stage, detetcing if the game is over, and updating displays 
 * 
 *  @param {number} index - the index in the list of dicts that repersents the stage
 *  @returns {void} when the game ends 
 * 
 */
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
/**
 *  Allows the player to sumbit their final time
 * 
 */
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

if (document.readState === 'loading') {
    window.addEventListener('DOMContentLoaded', startGame);
} else {
    startGame();
}