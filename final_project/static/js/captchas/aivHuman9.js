export function renderStage9(container,nextStage, startGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>select the text written by a <strong>HUMAN</strong>:</p>
        <div style="display:flex; gap:10px; margin:15px 0;">
            <button class="ai-opt" data-correct="false" style="padding:10px; flex:1;">"i forgor my pass lol please let me in I need to check my emails before my boss gets mad"
            </button>
            <button class="ai-opt" data-correct="true" style="padding:10px; flex:1;">"when i grow up i wanna be a cowboy and eat cream cheese crackers everyday and also have a pony"
            </button>
            <button class="ai-opt" data-correct="false" style="padding:10px; flex:1;">"I am a robot beep boop beep 01101001 00100000 01100001 01101101 00100000 01100001 00100000 01110011 01110100 01101001 01101110 01101011 01111001 00100000 01100011 01101100 01100001 01101110 01101011 01100101 01110010"
            </button>
        </div>
    `;

    container.appendChild(wrapper);

    wrapper.querySelectorAll('.ai-opt').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.dataset.correct === "true") {
                nextStage();
            } else {
                alert("so you admit you're a robot? hmmm")
                nextStage(true);
            }
        });
    });
}