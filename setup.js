const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

let score = 0;
let gameSpeed = 1;
let frame = 0;
let gameOver = false;
let imagesLoaded = 0;
let totalImages = 8; // background, background_lvl2, river_bank, grass, collisions, frog_spritesheet, cars, log, turtles

const scoreElement = document.getElementById('score');

const background = new Image();
background.src = 'assets/background.png';
background.onload = () => { console.log('Background loaded'); checkImagesLoaded(); };
background.onerror = () => console.error('Failed to load background');

const background_lvl2 = new Image();
background_lvl2.src = 'assets/background_lvl2.png';
background_lvl2.onload = () => { console.log('Background lvl2 loaded'); checkImagesLoaded(); };
background_lvl2.onerror = () => console.error('Failed to load background_lvl2');

const river_bank = new Image();
river_bank.src = 'assets/river_bank.png';
river_bank.onload = () => { console.log('River bank loaded'); checkImagesLoaded(); };
river_bank.onerror = () => console.error('Failed to load river_bank');

const grass = new Image();
grass.src = 'assets/grass.png';
grass.onload = () => { console.log('Grass loaded'); checkImagesLoaded(); };
grass.onerror = () => console.error('Failed to load grass');

const collisions = new Image();
collisions.src = 'assets/collision.png';
collisions.onload = () => { console.log('Collisions loaded'); checkImagesLoaded(); };
collisions.onerror = () => console.error('Failed to load collisions');

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded >= totalImages) {
        console.log('All images loaded, starting game');
        animate();
    }
}



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
        frog.update();
        handleObstacles();
        handleParticles();
        handleScore();
    }
    
    frog.draw();
    
    requestAnimationFrame(animate);
}

// animate(); // Removed - will be called when images are loaded


document.addEventListener('keydown', e => {
   
});
