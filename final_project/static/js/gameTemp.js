export function startGame() {
    currentStage = 0;
    startTime = Date.now();

    // update live timer display every 100ms
    timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        document.getElementById('timer-display').innerText = `${elapsed}s`;
    }, 100);

    loadStage(currentStage);
}

export function loadStage(index) {
    if (index >= captchas.length) {
        completeGame();
        return;
    }

    document.getElementById('stage-count').innerText = `${index + 1} / ${captchas.length}`;
    const container = document.getElementById('captcha-box');
    container.innerHTML = `<h2>${captchas[index].title}</h2>`;

    captchas[index].render(container);
}

export function nextStage() {
    currentStage++;
    loadStage(currentStage);
}

export async function completeGame() {
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

export function startPetMech() {
    let petHunger = 100;
    const petBar = document.getElementById('pet-hunger-bar');
    setInterval(() => {
        petHunger -= 2;
    });
}