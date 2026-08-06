
//bank of possible questions 
const mathQuestions = [
    {
        problem: "16 | 06 | 68 | 88 | [ ? ] | 98",
        answer: "78", // Upside down parking spot sequence: 86, 88, 89, 90, 91
    },
    {
        problem: "A frog falls into a well 10 feet deep. Each day it climbs up 3 feet, but each night it slips back 2 feet. How many days does it take to escape?",
        answer: "8", // on day 8, the frog is at 7 ft, and climbs up 3 ft which is enough to get out
    },
    {
        problem: "How many letters are in the correct answer?",
        answer: "16", // 16 letters total (excluding spaces)
    },
    {
        problem: "A book has pages numbered 1 to 100. How many times does the digit 9 appear across all the page numbers?",
        answer: "20", // shows up in units place 10 times, and in tens place ten times (90, 99)
    }
];

/**
 * Main render function, renders the captcha 
 * 
 * Answer the randomly chosen math question corretcly to pass
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */
export function renderStage3(container,nextStage, failGame) {
    //randomly chooses a question 
    const selectedQuestion = mathQuestions[Math.floor(Math.random() * mathQuestions.length)];

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>solve the following problem:</p>
        <div style="font-size: 20px; font-weight: bold; margin: 15px 0; background: #eee; padding: 10px; border-radius: 5px; color: #222;">
            ${selectedQuestion.problem}
        </div>
        <input type="text" id="math-answer-input" placeholder="answer..." style="padding: 8px;">
        <button id="math-submit-btn" style="padding: 8px 16px;">submit</button>
    `;

    container.appendChild(wrapper);

    const submitBtn = document.getElementById('math-submit-btn');
    const input = document.getElementById('math-answer-input');

    //checks if the answer is right
    submitBtn.addEventListener('click', () => {
        const userVal = input.value.trim();
        if (userVal === selectedQuestion.answer) {
            nextStage();
        } else {
            if (typeof failGame === 'function') {
                failGame();
            } else {
                location.reload();
            }
        }
    });
}