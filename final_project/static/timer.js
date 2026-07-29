let startTime = null;
let timerInterval = null;

export function startTimer(){
    startTime = Date.now()

    // update live timer display every 100ms
    timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        document.getElementById('timer-display').innerText = `${elapsed}s`;
    }, 100);
}

export function stopTimer(){
    clearInterval(timerInterval);
    const totalTime = parseFloat(((Date.now() - starTime) / 1000).toFixed(2));
    return totalTime;
}