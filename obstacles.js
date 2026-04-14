class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type; // 'car', 'log', 'turtle'
        this.frameX = 0;
        this.frameY = 0;
    }

    update() {
        this.x += this.speed;

        // Wrap around screen
        if (this.speed > 0 && this.x > canvas.width) {
            this.x = -this.width;
        }
        if (this.speed < 0 && this.x < -this.width) {
            this.x = canvas.width;
        }
    }

    draw() {
        if (this.type === 'car') {
            ctx.drawImage(carsImage, this.frameX * 250, this.frameY * 250, 250, 250, this.x, this.y, this.width, this.height);
        } else if (this.type === 'log') {
            ctx.drawImage(logImage, this.x, this.y, this.width, this.height);
        } else if (this.type === 'turtle') {
            ctx.drawImage(turtlesImage, this.frameX * 250, this.frameY * 250, 250, 250, this.x, this.y, this.width, this.height);
        }
    }
}

let obstacles = [];

// Image variables
const carsImage = new Image();
carsImage.src = 'assets/cars.png';
carsImage.onload = () => { console.log('Cars image loaded'); checkImagesLoaded(); };
carsImage.onerror = () => console.error('Failed to load cars image');

const logImage = new Image();
logImage.src = 'assets/log.png';
logImage.onload = () => { console.log('Log image loaded'); checkImagesLoaded(); };
logImage.onerror = () => console.error('Failed to load log image');

const turtlesImage = new Image();
turtlesImage.src = 'assets/turtles.png';
turtlesImage.onload = () => { console.log('Turtles image loaded'); checkImagesLoaded(); };
turtlesImage.onerror = () => console.error('Failed to load turtles image');

// Create initial obstacles 
function createObstacles() {
    obstacles = [];

    // Road 1 - cars moving right
    for (let i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(i * 250, 480, 80, 60, 2.5, 'car'));
    }

    // Road 2 - cars moving left
    for (let i = 0; i < 4; i++) {
        obstacles.push(new Obstacle(canvas.width - i * 200, 420, 90, 60, -3, 'car'));
    }

    // Road 3 - cars moving right (faster)
    for (let i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(i * 300, 360, 70, 60, 4, 'car'));
    }

    // River - logs moving left
    for (let i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(i * 280, 240, 180, 50, -1.8, 'log'));
    }

    // River - turtles moving right
    for (let i = 0; i < 4; i++) {
        obstacles.push(new Obstacle(i * 180, 180, 90, 50, 1.2, 'turtle'));
    }

    // River - logs moving right
    for (let i = 0; i < 2; i++) {
        obstacles.push(new Obstacle(i * 350, 120, 200, 50, 2, 'log'));
    }
}

function handleObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        obstacles[i].draw();

        // Collision detection with frog
        if (
            frog.x < obstacles[i].x + obstacles[i].width &&
            frog.x + frog.width > obstacles[i].x &&
            frog.y < obstacles[i].y + obstacles[i].height &&
            frog.y + frog.height > obstacles[i].y
        ) {
            if (obstacles[i].type === 'car') {
                gameOver = true;
            } else if (obstacles[i].type === 'log' || obstacles[i].type === 'turtle') {
                // Frog rides on log or turtle
                frog.x += obstacles[i].speed;
            }
        }
    }
}

// Call this once after images load (usually in setup or animate)
createObstacles();
