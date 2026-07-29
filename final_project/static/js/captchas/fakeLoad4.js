
export function renderStage4(container,nextStage, startGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>please wait while we verify your browser signature...</p>
        <p><small>click next when done processing.</small></p>

        <div style="width: 100%, background: #ddd; height: 20px; border-radius: 10px; overflow: hidden; margin: 15px 0;">
            <div id="progress-bar" style="width: 0%; height: 100%; background: #4caf50; transition: width 0.2s;"></div>
        </div>

        <button id="fake-next-btn" style="padding: 10px 20px; margin-top: 10px;" disabled>next stage</button>
    `;

    container.appendChild(wrapper);

    const bar = document.getElementById('progress-bar');
    const fakeBtn = document.getElementById('fake-next-btn');

    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 15;
        } else if (progress < 99) {
            progress += 0.5; 
        }
        bar.style.width = `${progress}%`;
    }, 300);

    const textNode = wrapper.querySelectorAll('strong');
    textNode.forEach(node => {
        if (node.innerText.toLowerCase() === 'next') {
            node.style.cursor = 'pointer';
            node.style.textDecoration = 'underline';
            node.addEventListener('click', () => {
                clearInterval(interval);
                nextStage();
            });
        }
    });

    fakeBtn.addEventListener('click', () => {
        alert("verification incomplete! restarting load sequence....")
        progress = 0;
    });
}