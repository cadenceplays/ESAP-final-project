export function renderStage11(container,nextStage, failGame) {
    const rows = 6;
    const cols = 7;
    let grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    let playerTurn = true;

    const wrapper = document.createElement('div');
    wrapper.className = 'captcha-stage';
    wrapper.innerHTML = `
        <p style="color: #222;">Connect 4: Get 4 in a row to pass!</p>
        <div id="c4-board" style="display: grid; grid-template-columns: repeat(7, 40px); gap: 4px; justify-content: center; background: #0056b3; padding: 8px; border-radius: 6px; margin: 15px auto; width: fit-content;">
            ${[...Array(rows * cols).keys()].map(i => `
                <div class="c4-cell" data-col="${i % cols}" style="width: 40px; height: 40px; background: #fff; border-radius: 50%; cursor: pointer;"></div>
            `).join('')}
        </div>
        <p id="c4-status" style="font-weight: bold; color: #333;">Click a column to drop your red token.</p>
    `;

    container.appendChild(wrapper);

    const statusText = document.getElementById('c4-status');

    function updateBoardUI() {
        const cells = wrapper.querySelectorAll('.c4-cell');
        cells.forEach((cell, idx) => {
            let r = Math.floor(idx / cols);
            let c = idx % cols;
            if (grid[r][c] === 'R') cell.style.background = '#dc3545';
            else if (grid[r][c] === 'Y') cell.style.background = '#ffc107';
            else cell.style.background = '#ffffff';
        });
    }

    function dropToken(col, player) {
        for (let r = rows - 1; r >= 0; r--) {
            if (!grid[r][col]) {
                grid[r][col] = player;
                return r;
            }
        }
        return -1; // Column full
    }

    function checkWin(p) {
        // Horizontal check
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols - 3; c++) {
                if (grid[r][c] === p && grid[r][c+1] === p && grid[r][c+2] === p && grid[r][c+3] === p) return true;
            }
        }
        // Vertical check
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === p && grid[r+1][c] === p && grid[r+2][c] === p && grid[r+3][c] === p) return true;
            }
        }

        // diagonal checks (down right)
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < cols - 3; c++) {
                if (grid[r][c] === p && grid[r+1][c+1] === p && grid[r+2][c+2] == p && grid[r+3][c+3] === p) return true;
            }
        }
        

        // diagonal checks (up right)
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols - 3; c++) {
                if (grid[r][c] === p && grid[r-1][c+1] === p && grid[r-2][c+2] == p && grid[r-3][c+3] === p) return true;
            }
        }

        return false;
    }

    function aiTurn() {
        let validCols = [];
        for (let c = 0; c < cols; c++) {
            if (!grid[0][c]) validCols.push(c);
        }

        if (validCols.length > 0) {
            let chosenCol = validCols[Math.floor(Math.random() * validCols.length)];
            dropToken(chosenCol, 'Y');
            updateBoardUI();

            if (checkWin('Y')) {
                statusText.innerText = "AI won!";
                setTimeout(() => failGame(), 1000);
            } else {
                playerTurn = true;
                statusText.innerText = "Your turn (Red)";
            }
        }
    }

    wrapper.querySelectorAll('.c4-cell').forEach(cell => {
        cell.addEventListener('click', (e) => {
            if (!playerTurn) return;

            let col = parseInt(e.target.dataset.col);
            let rowPlaced = dropToken(col, 'R');

            if (rowPlaced !== -1) {
                updateBoardUI();
                if (checkWin('R')) {
                    statusText.innerText = "Victory! Verification Passed!";
                    setTimeout(() => nextStage(), 800);
                } else {
                    playerTurn = false;
                    statusText.innerText = "AI is thinking...";
                    setTimeout(aiTurn, 600);
                }
            }
        });
    });
}