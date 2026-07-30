export function renderStage13(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.className = 'captcha-stage';
    wrapper.innerHTML = `
        <p style="color: #222; font-weight: bold;">Select the art created by a <strong style="color: #d9534f;">CLANKER</strong>:</p>
        <div style="display: flex; gap: 10px; margin: 15px 0; justify-content: center;">
            <button class="art" data-correct="false" style="padding: 10px; flex: 1; max-width: 150px; cursor: pointer; border: 2px solid #ccc; border-radius: 6px; background: #fff;">
                <img src="/static/images/human.png" alt="human" style="width: 100%; height: auto; display: block;" />
            </button>
            <button class="art" data-correct="true" style="padding: 10px; flex: 1; max-width: 150px; cursor: pointer; border: 2px solid #ccc; border-radius: 6px; background: #fff;">
                <img src="/static/images/ai.png" alt="ai" style="width: 100%; height: auto; display: block;" />
            </button>
        </div>
    `;

    container.appendChild(wrapper);

    wrapper.querySelectorAll('.art').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const isCorrect = e.currentTarget.dataset.correct === "true";

            if (isCorrect) {
                nextStage();
            } else {
                failGame();
            }
        });
    });
}