
// text box not appearing
export function renderStage5(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML =  `
        <p>prove your humanity by writing a hearfelt paragraph explaining why the devs of this project are amazing and cool and awesome and smart and cool.</p>
        <textarea id="essay-input" rows="5" cols="35" placeholder="sing your praises here..." style="margin-top: 10px; padding: 8px; font-famly: inherit;"></textarea>
        <br>
        <button id="essay-submit" style="margin-top: 10px; padding: 8px 16px;">submit</button>
    ` ;

    container.appendChild(wrapper);

    const input = document.getElementById('essay-input');

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        alert("don't even think about it.");
    });

    document.getElementById('essay-submit').addEventListener('click', () => {
        const text = input.value.toLowerCase();

        const mentionsDev = text.includes('dev');
        const compliments = ['cool', 'amazing', 'genius', 'rizz', 'awesome', 'smart', 'goat', 'san', 'senpai', 'thank you'];
        const hasCompliment = compliments.some(word => text.includes(word));

        if (mentionsDev && hasCompliment) {
            alert("awww thank you ^^");
            nextStage();
        } else {
            failGame();
        }
    });
}