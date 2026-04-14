class Frogger {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
        this.frameCount = 0;
        this.maxFrame = 3;
        this.frogSpriteSheet = new Image();
        this.frogSpriteSheet.src = 'frog_spritesheet.png';
    }

    update() {
        if (keys['ArrowUp'] && this.y > 0 && !this.moving) {
            this.y -= grid;
            this.frameY = 0;
            this.moving = true;
            this.frameCount = 0;
        }
        if (keys['ArrowDown'] && this.y < canvas.height - this.height && !this.moving) {
            this.y += grid;
            this.frameY = 2;
            this.moving = true;
            this.frameCount = 0;
        }
        if (keys['ArrowLeft'] && this.x > 0 && !this.moving) {
            this.x -= grid;
            this.frameY = 3;
            this.moving = true;
            this.frameCount = 0;
        }
        if (keys['ArrowRight'] && this.x < canvas.width - this.width && !this.moving) {
            this.x += grid;
            this.frameY = 1;
            this.moving = true;
            this.frameCount = 0;
        }

        // Reset moving flag after animation
        if (this.frameCount > 10) {
            this.moving = false;
            this.frameCount = 0;
        } else {
            this.frameCount++;
        }

        // Animate frames
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    }

    draw() {
        ctx.drawImage(
            this.frogSpriteSheet,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.width, this.height
        );
    }

    reset() {
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.frameX = 0;
        this.frameY = 0;
    }
}

const frog = new Frogger();
const grid = 60; // grid size used for movement

let keys = {};

document.addEventListener('keydown', e => {
    keys[e.key] = true;
});

document.addEventListener('keyup', e => {
    keys[e.key] = false;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
        e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        
    }
});
