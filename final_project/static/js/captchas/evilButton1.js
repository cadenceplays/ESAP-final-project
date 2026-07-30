
/**
 * Main render function, renders the captcha  
 * 
 * Evil button that doesnt want to touch you
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */

export function renderStage1(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>check the box to verify that you are NOT a robot:</p>
        <div style="height: 200px; position: relative;" id="runaway-area">
            <button id="runaway-btn" style="position: absolute; top: 80px; left: 80px;">i am human</button>
        </div>
    `;
    
    container.appendChild(wrapper);

    //the submit button 
    const btn = document.getElementById('runaway-btn');

    //area the button is constained to
    const area = document.getElementById('runaway-area');

    //moves the button when you mouseover it
    btn.addEventListener('mouseover', () => {
        console.log("mouse detected")
        
        const maxX = area.clientWidth - btn.clientWidth;
        const maxY = area.clientHeight - btn.clientHeight;

        btn.style.left = `${Math.floor(Math.random() * maxX)}px`;
        btn.style.top = `${Math.floor(Math.random() * maxY)}px`;
    });

    btn.addEventListener('click', () => {
        nextStage();
    });
}