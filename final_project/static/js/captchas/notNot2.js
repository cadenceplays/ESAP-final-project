/**
 * Main render function, renders the catchpa 
 * 
 * are you sure?
 * 'click on me if you're not not not not not not a robot' --> if you click on it, you fail lmao
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */

export function renderStage2(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>are you <em>ABSOLUTELY SURE</em> you're not not not not not not a robot????</p>
        <button id="no-btn">no</button>
        <button id="yes-btn">yes, i'm pretty sure</button>
    `;

    container.appendChild(wrapper);

    // makes uncertinanty 
    document.getElementById('no-btn').addEventListener('click', () => {
        alert(".......are you sure?");
        nextStage();
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        failGame();
    });
}