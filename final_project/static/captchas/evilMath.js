// evil and scary trivia
export function renderStage3(container) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>what is the missing parking spot number?</p>
        <img src="evil_math.png">
        <input type="text" id="math-input" placeholder="answer...">
        <button id="math-submit">submit</button>
    `;

    container.appendChild(wrapper);

    document.getElementById('math-submit').addEventListener('click', () => {
        const val = document.getElementById('math-input').ariaValueMax.trim();

        if (val == "78" || val == "87") {
            nextStage();
        } else {
            alert("nice try, clanker.")
        }
    });
}