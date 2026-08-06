let startTime = null;
let timerInterval = null;

/**
 * Starts a timer
 * 
 */
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


/**
 * Stops the timer and returns how much time has elapsed
 * 
 *  @returns {number} the amount of time in seconds that has passed
 * 
 */
export function stopTimer(){
    clearInterval(timerInterval);
    if (!startTime) return 0.0;
    return parseFloat(((Date.now() - startTime) / 1000).toFixed(2));

}