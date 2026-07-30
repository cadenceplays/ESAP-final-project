/**
 * Main render function, renders the captcha 
 * 
 * Click when the bar is in the green zone
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */
export function renderStage7(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>click when the bar is inside the green zone:</p>
        <div style="position:relative; width:100%; height:30px; background:#ddd; border-radius:5px; margin:20px 0;">
            <div style="position:absolute; left:40%; width:10%; height:100%; background:#4caf50;"></div>
            <div id="slider-pin" style="position:absolute; left:0%; width:5px; height:100%; background:red;"></div>
        </div>
        <button id="slider-stop-btn">stop</button>
    `;

    container.appendChild(wrapper);

    const pin = document.getElementById("slider-pin");
    let pos = 0;
    let direction = 1;
    let speed = 2;

    const interval = setInterval(() => {
        pos += speed * direction;
        if (pos >= 98 || pos <= 0) direction *= -1;
        pin.style.left = `${pos}%`;
    }, 20);

    document.getElementById("slider-stop-btn").addEventListener('click', () => {
        clearInterval(interval);
        
        if (pos >= 40 && pos <= 50) {
            nextStage();
        } else {
            failGame(); 
        }
    });
}