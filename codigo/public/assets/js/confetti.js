import canvasConfetti from 'https://cdn.skypack.dev/canvas-confetti';

function party(){
    canvasConfetti()
}
document.getElementById('confetti').addEventListener('click', party)