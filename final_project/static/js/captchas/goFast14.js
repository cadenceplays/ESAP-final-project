// clicker/typing test

export function renderStage14(container,nextStage, failGame) {
    let score = 0;
    const targetScore = 100;
    let time = 0; 

    const click = document.getElementById('click');

    click.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
    });
}