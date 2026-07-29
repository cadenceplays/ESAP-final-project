export function renderStage6(container,nextStage, startGame) {
    const targetText = "我是一个真实的人。";
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
        <p>escribe las palabras en el cuadro de abajo: </p>
        <h3 style="background: #eee; padding: 10px; display: inline-block; user-select: none;">${targetText}</h3>
        <br>
        <input type="text" id="cn-input" placeholder="type characters here..." style="margin-top:10px;">
        <button id="cn-submit">submit</button>
    `;

    container.appendChild(wrapper);

    const input = document.getElementById('cn-input');

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        alert("don't even think about it, clanker.")
    });

    document.getElementById('cn-submit').addEventListener('click', () => {
        if (input.value.trim() === targetText) {
            nextStage();
        } else {
            alert("try again next time, clanker!");
            startGame(); 
        }
    });
}