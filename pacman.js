let pacman = 
{
    x: 10,
    y: 10,
    clipX: 40,
    clipY: 0,
    steps: 0,
    direction: 0
};

const speed = 5;

let victory = false;
let defeat = false;

let keyState = {};

let pacmanObj = new Image();
pacmanObj.src = "minos.png";

function pacminos_init() {
    canvas = document.getElementById("pacman_canvas");
    canvasContext = canvas.getContext("2d");

    window.addEventListener(
        "keydown",
        function(e) {
            if ((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode >= 68 && e.keyCode <= 90)) {
                e.preventDefault();
                keyState[e.keyCode || e.which] = true;
            }
        },
        true
    );
    window.addEventListener(
        "keyup",
        function(e) {
            if ((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode >= 68 && e.keyCode <= 90)) {
                e.preventDefault();
                keyState[e.keyCode || e.which] = false;
            }
        },
        true
    );

    var rejouer = document.getElementById("rejouer_button");
    rejouer.onclick = function() {
        return reload();
    }

    gameLoop = setInterval(pacmanGame, 1000 / 30); // FPS
}

window.onload = function() {
    pacminos_init();
};

function reload() {
    pacman = 
    {
        x: 10,
        y: 10,
        clipX: 40,
        clipY: 0,
        steps: 0,
        direction: 0
    };
    ghosts = [
        {
            x: 10 + pillDistance * 6,
            y: 10 + pillDistance * 6,
            direction: 4,
            active: true,
            clipX: 120,
            clipY: 0,
            steps: 0
        },
        {
            x: 10 + pillDistance * 7,
            y: 10 + pillDistance * 6,
            direction: 1,
            active: true,
            clipX: 120,
            clipY: 0,
            steps: 0
        }
    ];
    pills = [];
    collectedPills = 0;
    victory = false;
    defeat = false;
    wallsCreated = false;

    document.getElementById("rejouer").style.visibility='invisible';
    document.getElementById("rejouer").style.display='none';
    document.getElementById("perdu").style.visibility='invisible';
    document.getElementById("perdu").style.display='none';
    document.getElementById("gagne").style.visibility='invisible';
    document.getElementById("gagne").style.display='none';

    gameLoop = setInterval(pacmanGame, 1000 / 30); // FPS
}

function pacmanGame() {
    canvasContext.fillStyle = "#f6f6f6";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    createWalls();
    createPills();
    createPacman();
    detectPillCollision();
    createGhosts();
    detectGhostPacmanCollision();

    if (defeat || victory) {
        canvasContext.fillStyle = "#f6f6f6";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        createWalls();
        createPills();

        if (victory) {
            pacman.clipX = 40;
            pacman.clipY = 160;

            let canvasPacman = document.createElement("canvas");
            let pacmanContext = canvasPacman.getContext("2d");
            canvasPacman.width = canvasPacman.height = objectSize;

            pacmanContext.drawImage(pacmanObj, pacman.clipX, pacman.clipY, 40, 40, 0, 0, 30, 30);
            canvasContext.drawImage(pacmanContext.canvas, pacman.x, pacman.y);

            document.getElementById("gagne").style.visibility='visible';
            document.getElementById("gagne").style.display='block';
        } else {
            ghosts.forEach(ghost => {
                ghost.clipX = 160;
                ghost.clipY = 160;

                let canvasGhost = document.createElement("canvas");
                let ghostContext = canvasGhost.getContext("2d");
                
                canvasGhost.width = canvasGhost.height = objectSize;
                ghostContext.drawImage(imageObj, ghost.clipX, ghost.clipY, 40, 40, 0, 0, 30, 30);
                canvasContext.drawImage(ghostContext.canvas, ghost.x, ghost.y);
            });

            document.getElementById("perdu").style.visibility='visible';
            document.getElementById("perdu").style.display='block';
        }
        document.getElementById("rejouer").style.visibility='visible';
        document.getElementById("rejouer").style.display='block';
        
        clearInterval(gameLoop);
    }
}

function createPacman() {
    previous_dir = pacman.direction;
    pacman.direction = 0;
    // Change direction based on keystate.
    if (keyState[90] || keyState[38]) {
        if (detectObjectWallCollision(pacman.x, pacman.y - speed) == false) {
            pacman.direction = 1;
        }
    } else if (keyState[68] || keyState[39]) {
        if (detectObjectWallCollision(pacman.x + speed, pacman.y) == false) {
            pacman.direction = 2;
        }
    } else if (keyState[83] || keyState[40]) {
        if (detectObjectWallCollision(pacman.x, pacman.y + speed) == false) {
            pacman.direction = 3;
        }
    } else if (keyState[81] || keyState[37]) {
        if (detectObjectWallCollision(pacman.x - speed, pacman.y) == false) {
            pacman.direction = 4;
        }
    }

    if (previous_dir != pacman.direction) {
        pacman.steps = 0;
    }

    let canvasPacman = document.createElement("canvas");
    let pacmanContext = canvasPacman.getContext("2d");
    canvasPacman.width = canvasPacman.height = objectSize;

    previous_steps = pacman.steps;
    // Set movement based on direction.
    pacman.clipX = 40;
    if (pacman.direction != 0) {
        switch (pacman.direction) {
        case 1:
            pacman.clipY = 40;
            if (detectObjectWallCollision(pacman.x, pacman.y - speed) == false) {
                pacman.y = pacman.y - speed;
                pacman.steps += 1;
            }
            break;
        case 2:
            pacman.clipY = 120;
            if (detectObjectWallCollision(pacman.x + speed, pacman.y) == false) {
                pacman.x = pacman.x + speed;
                pacman.steps += 1;
            }
            break;
        case 3:
            pacman.clipY = 0;
            if (detectObjectWallCollision(pacman.x, pacman.y + speed) == false) {
                pacman.y = pacman.y + speed;
                pacman.steps += 1;
            }
            break;
        case 4:
            pacman.clipY = 80;
            if (detectObjectWallCollision(pacman.x - speed, pacman.y) == false) {
                pacman.x = pacman.x - speed;
                pacman.steps += 1;
            }
            break;
        }
        if (previous_steps != pacman.steps) {
            if (pacman.steps % 9 >= 6) {
                pacman.clipX = 0;
            } else if (pacman.steps % 9 >= 3) {
                pacman.clipX = 80;
            }
        }
    }
    
    pacmanContext.drawImage(pacmanObj, pacman.clipX, pacman.clipY, 40, 40, 0, 0, 30, 30);
    canvasContext.drawImage(pacmanContext.canvas, pacman.x, pacman.y);
}
