export function renderStage12(container,nextStage, failGame) {
    // layout:
    // 0 | 1 | 2 | 3
    // 4 | 5 | 6 | 7 etc.
    const correctIndices = [1, 3, 4, 6, 9, 11, 12, 14];

    const selectedIndices = new Set();
    const imagePath = "/static/images/dog.png";

    const wrapper = document.createElement('div');
    wrapper.className = 'captcha-stage';
    wrapper.innerHTML = `
        <p style="color: #222; font-weight: bold; margin-bottom: 8px;">
            Select all squares with a <span style="color: #d9534f;">DOG</span>:
        </p>
        
        <div id="dog-grid" style="
            display: grid; 
            grid-template-columns: repeat(4, 80px); 
            grid-template-rows: repeat(4, 80px); 
            gap: 2px; 
            justify-content: center; 
            background: #ccc; 
            padding: 2px; 
            border-radius: 6px; 
            margin: 10px auto; 
            width: fit-content;
        ">
            ${[...Array(16).keys()].map(i => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                // Calculate position percentage for 4x4 background slicing
                const posX = (col / 3) * 100;
                const posY = (row / 3) * 100;

                return `
                    <div class="grid-cell" data-idx="${i}" style="
                        width: 80px; 
                        height: 80px; 
                        background-image: url('${imagePath}'); 
                        background-size: 320px 320px; 
                        background-position: ${posX}% ${posY}%; 
                        cursor: pointer; 
                        position: relative; 
                        box-sizing: border-box;
                        transition: opacity 0.15s ease;
                    "></div>
                `;
            }).join('')}
        </div>

        <button id="grid-verify-btn" style="margin-top: 10px; padding: 8px 20px; background: #6790f4; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
            Verify
        </button>
    `;

    container.appendChild(wrapper);

    const cells = wrapper.querySelectorAll('.grid-cell');

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.dataset.idx);

            if (selectedIndices.has(idx)) {
                selectedIndices.delete(idx);
                e.currentTarget.style.border = 'none';
                e.currentTarget.style.opacity = '1';
            } else {
                selectedIndices.add(idx);
                e.currentTarget.style.border = '3px solid #';
                e.currentTarget.style.opacity = '0.75';
            }
        });
    });

    document.getElementById('grid-verify-btn').addEventListener('click', () => {
        const userSelected = Array.from(selectedIndices).sort((a, b) => a - b);
        const expected = [...correctIndices].sort((a, b) => a - b);

        const isCorrect = userSelected.length === expected.length && userSelected.every((val, index) => val === expected[index]);

        if (isCorrect) {
            nextStage();
        } else {
            failGame();
        }
    });
}