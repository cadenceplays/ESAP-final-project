// are you sure?
// 'click on me if you're not not not not not not a robot' --> if you click on it, you fail lmao
export function renderStage2(container) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>are you <em>ABSOLUTELY SURE</em> you're not not not not not not a robot????</p>
        <button id="no-btn">no</button>
        <button id="yes-btn">yes, i'm pretty sure</button>
    `;

    container.appendChild(wrapper);

    document.getElementById('no-btn').addEventListener('click', () => {
        alert(".......are you sure?");
        nextStage();
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        alert("nice try clanker");
        startGame();
    });
}