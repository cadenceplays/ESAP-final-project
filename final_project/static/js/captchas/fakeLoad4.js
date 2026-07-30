/**
 * Main render function, renders the captcha 
 * 
 * Fake loading bar. Click the next link to progress
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */
export function renderStage4(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p style="color: #ffffff;">Please wait while system checks complete...</p>
        <p style="color: #e0e0e0; font-size: 14px;">
            Click <strong id="secret-next-word" style="cursor: pointer;">next</strong> when done processing.
        </p>
        
        <div style="width: 100%; background: #e0e0e0; height: 22px; border-radius: 11px; overflow: hidden; margin: 15px 0; border: 1px solid #ccc;">
            <div id="fake-progress-bar" style="width: 0%; height: 100%; background: #28a745; transition: width 0.3s linear;"></div>
        </div>

        <button id="fake-next-btn" style="padding: 8px 16px;" >Next</button>
    `;

    container.appendChild(wrapper);

    const progressBar = document.getElementById('fake-progress-bar');
    const fakeBtn = document.getElementById('fake-next-btn');
    const secretWord = document.getElementById('secret-next-word');


    //fake progress bar loading scheme 
    
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 15;
        } else if (progress < 99) {
            progress += 0.2; 
        }
        if (progressBar) progressBar.style.width= `${progress}%`;
    }, 250);

    //passes if you click the next text
    secretWord.addEventListener('click', () => {
        clearInterval(interval);
        nextStage();
    })

    // fails if the fake next button is clicked
    fakeBtn.addEventListener('click', () => {
        clearInterval(interval);
        failGame();
    });
}