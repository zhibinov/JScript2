export const timer = document.getElementById('timer');
const timerResult = document.getElementById('timer__result');
const timerStart = document.getElementById('timer__start');

function soundClick() {
    let audio = new Audio();
    audio.src = '../audio.mp3';
    audio.autoplay = true;
}

timerStart.addEventListener('click', function (event) {
    event.preventDefault();
    let i = 10;
    let id = setInterval(function () {
        i--;

        if (i == 0) {
            clearInterval(id);
            soundClick();
        } else {
            timerResult.innerHTML = i;
        }
    }, 1000);
})
