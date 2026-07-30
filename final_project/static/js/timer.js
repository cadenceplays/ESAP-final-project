let startTime = null;
let timerInterval = null;

export function startTimer(){
    startTime = Date.now()
    const display = document.getElementById('timer-display');

    if (timerInterval) clearInterval(timerInterval);

    // update live timer display every 100ms
    timerInterval = setInterval(() => {
        if (display && startTime){
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            display.innerText = `${elapsed}s`;
        }
    }, 100);
}

export function stopTimer(){
    clearInterval(timerInterval);
    //figure out which version is better tmr...
    //if (!startTime) return 0.0;
    //return parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
    
    //const totalTime = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
    //return totalTime;
}