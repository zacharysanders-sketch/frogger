class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(255,255,255,0.8)';
        this.life = 30;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size *= 0.95;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Dust extends Particle {
    constructor(x, y) {
        super(x, y);
        this.color = 'rgba(200,200,200,0.6)';
        this.size = Math.random() * 4 + 3;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 + 1;
        this.life = 20;
    }
}

class Ripple extends Particle {
    constructor(x, y) {
        super(x, y);
        this.color = 'rgba(100,200,255,0.4)';
        this.size = 8;
        this.speedX = 0;
        this.speedY = 0;
        this.life = 25;
    }

    update() {
        this.size += 0.8;
        this.life--;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

let particles = [];
let ripples = [];


function createDust(x, y) {
    for (let i = 0; i < 5; i++) {
        particles.unshift(new Dust(x + Math.random() * 30 - 15, y + 40));
    }
}


function createRipple(x, y) {
    ripples.unshift(new Ripple(x + 25, y + 25));
}
