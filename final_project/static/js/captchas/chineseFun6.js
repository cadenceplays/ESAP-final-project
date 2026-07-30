export function renderStage6(container,nextStage, failGame) {
    const targetText = "我是一个真实的人。";
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
        <p>escribe las palabras en el cuadro de abajo: </p>
        
        <div style="background: #e0e0e0; padding: 12px 20px; display: inline-block; border-radius: 4px; margin: 10px 0;">
            <span style="font-size: 28px; font-weight: bold; color: #000000; letter-spacing: 4px; user-select: none;">${targetText}</span>
        </div>
        <br>
        <input type="text" id="cn-input" placeholder="type characters here..." style="padding: 8px; font-size: 16px; margin-top: 10px;">
        <br>
        <button id="cn-submit" style="margin-top: 10px; padding: 8px 16px;">submit</button>
    `;

    container.appendChild(wrapper);

    const input = document.getElementById('cn-input');

    document.getElementById('cn-submit').addEventListener('click', () => {
        if (input.value.trim() === targetText) {
            nextStage();
        } else {
            failGame(); 
        }
    });
}