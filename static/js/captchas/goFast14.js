/**
 * Main render function, renders the captcha 
 * 
 * Click as fast as you can to pass this stage
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */

export function renderStage14(container,nextStage, failGame) {
    let score = 0;
    const targetScore = 25;
    let timeLeft = 5;
    let timerInterval = null;

    const wrapper = document.createElement('div');
    wrapper.className = 'captcha-stage';
    wrapper.innerHTML =  `
        <p style="color: #222; font-weight: bold; margin-bottom: 8px;">
            Click <span style="color: #d9534f;">${targetScore} times</span> before time runs out!
        </p>

        <div style="display: flex; justify-content: space-around; max-width: 280px; margin: 0 auto 15px auto; font-weight: bold; color: #333;">
            <div>Clicks: <span id="click-score" style="color: black; font-size: 18px;">0</span> / ${targetScore}</div>
            <div>Time Left: <span id="click-timer" style="color: #d9534f; font-size: 18px;">${timeLeft}s</span></div>
        </div>

        <button id="click-btn" style="
            width: 140px; 
            height: 140px; 
            border-radius: 50%; 
            background: #28a745; 
            color: white; 
            font-size: 20px; 
            font-weight: bold; 
            border: 4px solid #1e7e34; 
            cursor: pointer; 
            user-select: none;
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            transition: transform 0.05s ease;
        ">
            CLICK!
        </button>
    `

    container.appendChild(wrapper);

    const clickBtn = document.getElementById('click-btn');
    const scoreDisplay = document.getElementById('click-score');
    const timerDisplay = document.getElementById('click-timer');

    function cleanup() {
        if (timerInterval) clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.innerText = `${timeLeft}s`;

        if (timeLeft <= 0) {
            cleanup();
            if (score < targetScore) {
                failGame();
            }
        }
    }, 1000);

    clickBtn.addEventListener('click', () => {
        score++;
        if (scoreDisplay) scoreDisplay.innerText = score;

        clickBtn.style.transform = 'scale(0.92)';
        setTimeout(() => clickBtn.style.transform = 'scale(1)', 50);

        if (score >= targetScore) {
            cleanup();
            clickBtn.disabled = true;
            clickBtn.style.background = '#6c757d';
            setTimeout(() => nextStage(), 300);
        }
    });
}