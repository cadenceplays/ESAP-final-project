export function renderStage13(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>select the art created by a <strong>CLANKER</strong>:</p>
        <div style="display:flex; gap:10px; margin:15px 0;">
            <button class="art" data-correct="false" style="padding:10px; flex:1;">
                <img src="/static/images/human.png" alt="human" border="0" />
            </button>
            <button class="art" data-correct="true" style="padding:10px; flex:1;">
                <img src="static/images/ai.png" alt="ai" border="0" />
            </button>
        </div>
    `;

    container.appendChild(wrapper);

    wrapper.querySelectorAll('.art').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.dataset.correct === "true") {
                nextStage();
            } else {
                failGame();
            }
        });
    });
}