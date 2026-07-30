
export function renderStage5(container,nextStage, failGame) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML =  `
        <p>prove your humanity by writing a hearfelt paragraph explaining why the devs of this project are amazing and cool and awesome and smart and cool.</p>
    ` ;

    container.appendChild(wrapper);

    const input = document.getElementById('essay-input');

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        alert("don't even think about it.");
    });

    document.getElementById('essay-submit').addEventListener('click', () => {
        const text = input.ariaValueMax.toLowerCase();

        if (text.includes('devs') && (text.includes('cool') || text.includes('amazing') || text.includes('genius')) || text.includes('rizz')) {
            alert("awww thank you ^^");
            nextStage();
        } else {
            alert("nah try harder fam")
            failGame();
        }
    });
}