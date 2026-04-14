let keys = {};

document.addEventListener('keydown', e => {
    keys[e.key] = true;
});

document.addEventListener('keyup', e => {
    delete keys[e.key];
});

function scored() {
    score += 100;
    gameSpeed += 0.2;
    frog.reset();
}

function resetGame() {
    score = 0;
    gameSpeed = 1;
    frame = 0;
    gameOver = false;
    frog.reset();
    createObstacles();
}

function checkCollision() {
    // Water collision (if frog is in river area and not on log/turtle)
    if (frog.y < 300 && frog.y > 100) {
        let onLogOrTurtle = false;
        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].type === 'log' || obstacles[i].type === 'turtle') {
                if (
                    frog.x < obstacles[i].x + obstacles[i].width &&
                    frog.x + frog.width > obstacles[i].x &&
                    frog.y < obstacles[i].y + obstacles[i].height &&
                    frog.y + frog.height > obstacles[i].y
                ) {
                    onLogOrTurtle = true;
                    break;
                }
            }
        }
        if (!onLogOrTurtle) {
            gameOver = true;
        }
    }

    // Top reach (win condition - reaching the top)
    if (frog.y <= 50) {
        scored();
    }
}

// Handle particles and ripples in animation loop (called from setup/animate)
function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < ripples.length; i++) {
        ripples[i].update();
        ripples[i].draw();

        if (ripples[i].life <= 0) {
            ripples.splice(i, 1);
            i--;
        }
    }
}
