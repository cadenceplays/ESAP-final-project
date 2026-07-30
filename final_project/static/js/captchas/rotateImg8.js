export function renderStage8(container,nextStage, failGame) {
    let rotation = 135;

    const wrapper = document.createElement('div');
    wrapper.className = 'captcha-stage';
    wrapper.innerHTML = `
        <p style="color: #222;">Rotate the object until it is upright (0°):</p>
        <div style="margin: 25px 0; display: flex; justify-content: center; align-items: center;">
            <div id="rotatable-item" style="font-size: 72px; display: inline-block; cursor: pointer; transform: rotate(${rotation}deg); transition: transform 0.2s ease;">
                🚗
            </div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="rotate-left-btn" style="padding: 8px 12px;">↺ Rotate Left</button>
            <button id="rotate-right-btn" style="padding: 8px 12px;">↻ Rotate Right</button>
        </div>
        <br>
        <button id="rotate-confirm-btn" style="margin-top: 15px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Confirm Alignment
        </button>
    `;

    container.appendChild(wrapper);

    const item = document.getElementById('rotatable-item');

    document.getElementById('rotate-left-btn').addEventListener('click', () => {
        rotation = (rotation - 45 + 360) % 360;
        item.style.transform = `rotate(${rotation}deg)`;
    });

    document.getElementById('rotate-right-btn').addEventListener('click', () => {
        rotation = (rotation + 45) % 360;
        item.style.transform = `rotate(${rotation}deg)`;
    });

    document.getElementById('rotate-confirm-btn').addEventListener('click', () => {
        // Upright is 0 degrees (or 360)
        if (rotation === 0) {
            nextStage();
        } else {
            failGame();
        }
    });
}