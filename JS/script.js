const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const bestScoreElement = document.querySelector('.best-score');

let score = 0;
let scored = false;

let bestScore = localStorage.getItem('bestScore') || 0;
bestScoreElement.innerText = `Recorde: ${bestScore}`;

const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 170 && pipePosition > 0 && marioPosition < 65) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '50px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

    
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
            bestScoreElement.innerText = `Recorde: ${bestScore}`;
        }
    }

    if (pipePosition < 0 && !scored) {
        score++;
        scoreElement.innerText = `Pontuação: ${score}`;
        scored = true;
    }

    if (pipePosition > 170) {
        scored = false;
    }

}, 10);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
