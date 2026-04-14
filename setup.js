const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

let score = 0;
let gameSpeed = 1;
let frame = 0;
let gameOver = false;

const scoreElement = document.getElementById('score');

const background = new Image();
background.src = 'background.png';

const background_lvl2 = new Image();
background_lvl2.src = 'background_lvl2.png';

const river_bank = new Image();
river_bank.src = 'river_bank.png';

const grass = new Image();
grass.src = 'grass.png';

const collisions = new Image();
collisions.src = 'collision.png';



let particles = [];
let obstacles = [];

function handleScore() {
    scoreElement.innerHTML = score.toString().padStart(5, '0');
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background layers
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    
    if (!gameOver) {
        frame++;
        handleScore();
    }
    
    requestAnimationFrame(animate);
}

animate();


document.addEventListener('keydown', e => {
   
});
