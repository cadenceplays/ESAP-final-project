
// evil button that doesnt want to touch you
export function renderStage1(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>check the box to verify that you are NOT a robot:</p>
        <div style="height: 200px; position: relative;" id="runaway-area">
            <button id="runaway-btn" style="position": absolute; top: 80px; left: 80px;">i am human</button>
        </div>
    `;
    
    container.appendChild(wrapper);

    const btn = document.getElementById('runaway-btn');
    const area = document.getElementById('runaway-area');

    btn.addEventListener('mouseover', () => {
        const maxX = area.clientWidth - btn.clientWidth;
        const maxY = area.clientHeight - btn.clientHeight;
        btn.style.left = `${Math.floor(Math.random() * maxX)}px`;
        btn.style.top = `${Math.floor(Math.random() * maxY)}px`;
    });

    btn.addEventListener('click', () => {
        nextStage();
    });
}