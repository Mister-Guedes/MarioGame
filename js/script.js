const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverScreen = document.querySelector('.game-over-screen');
const restartButton = document.getElementById('restart-button');

// Criar objetos de áudio
const backgroundMusic = new Audio('./musics/K.O..mp3'); // Música de fundo
const gameOverSound = new Audio('./musics/bombaforte.mp3'); // Som de game over

// Configurar a música de fundo
backgroundMusic.loop = true; // Para tocar em loop
backgroundMusic.volume = 0.5; // Ajuste o volume conforme necessário

// Espera o usuário interagir para tocar a música
document.addEventListener('keydown', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => console.log("Autoplay bloqueado:", error));
    }
}, { once: true }); // Garante que só será chamado uma vez

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 55 && pipePosition > 0 && marioPosition < 90) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './Imgs/death-image.png';
        mario.style.width = '200px';

        backgroundMusic.pause(); // Para a música de fundo
        gameOverSound.play(); // Toca o som de game over

        clearInterval(loop);

        // Exibir a tela de "Game Over"
        gameOverScreen.style.display = 'block';
    }
}, 10);

document.addEventListener('keydown', jump);

// Evento para reiniciar o jogo ao clicar no botão
restartButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página
});
