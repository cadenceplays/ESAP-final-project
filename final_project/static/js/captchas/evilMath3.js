
// evil and scary trivia
const mathQuestions = [
    {
        problem: "16 | 06 | 68 | 88 | [ ? ] | 98",
        answer: "78", // Upside down parking spot sequence: 86, 88, 89, 90, 91
    },
    {
        problem: "If 1 = 5, 2 = 25, 3 = 325, 4 = 4325, then 5 = ?",
        answer: "1", // 1 = 5, so 5 = 1!
    },
    {
        problem: "How many letters are in the correct answer?",
        answer: "16", // 16 letters total (excluding spaces)
    }
];

export function renderStage3(container,nextStage, failGame) {
    const selectedQuestion = mathQuestions[Math.floor(Math.random() * mathQuestions.length)];

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>solve the following problem:</p>
        <div style="font-size: 20px; font-weight: bold; margin: 15px 0; background: #eee; padding: 10px; border-radius: 5px;">
            ${q.problem}
        </div>
        <input type="text" id="math-answer-input" placeholder="answer..." style="padding: 8px;">
        <button id="math-submit-btn" style="padding: 8px 16px;">submit</button>
    `;

    container.appendChild(wrapper);

    const submitBtn = document.getElementById('math-submit-btn');
    const input = document.getElementById('manth-answer-input');

    submitBtn.addEventListener('click', () => {
        const userVal = input.value.trim();
        if (userVal === q.answer) {
            nextStage();
        } else {
            alert('wrong! nice try, clanker');
            if (typeof failGame === 'function') {
                failGame();
            } else {
                location.reload();
            }
        }
    });
}