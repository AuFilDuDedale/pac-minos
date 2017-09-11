let ghosts = [
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

const ghost_speed = 3;

let imageObj = new Image();
imageObj.src = "minos.png";

// Create ghosts.
function createGhosts() {
  // Set ghosts position.
  updateGhosts();

  // Render ghosts.
  ghosts.forEach(ghost => {
        if (ghost.active) {
            let canvasGhost = document.createElement("canvas");
            let ghostContext = canvasGhost.getContext("2d");
            canvasGhost.width = canvasGhost.height = objectSize;

            /*if (bluePillIsActive) {
                ghostContext.drawImage(imageObj, 0, 498, 100, 100, 0, 0, 30, 30);
                canvasContext.drawImage(ghostContext.canvas, ghost.x, ghost.y);
            } else {*/
                // Get image of ghost from sprite.
                ghost.clipX = 120;
                switch (ghost.direction) {
                case 1:
                    ghost.clipY = 40;
                    break;
                case 2:
                    ghost.clipY = 120;
                    break;
                case 3:
                    ghost.clipY = 0;
                    break;
                case 4:
                    ghost.clipY = 80;
                    break;
                }
                if (ghost.steps % 9 >= 6) {
                    ghost.clipX = 160;
                } else if (ghost.steps % 9 >= 3) {
                    ghost.clipX = 200;
                }

                ghostContext.drawImage(imageObj, ghost.clipX, ghost.clipY, 40, 40, 0, 0, 30, 30);
                canvasContext.drawImage(ghostContext.canvas, ghost.x, ghost.y);
                ghost.steps += 1;
            //}
        }
    });
}

/**
 * Calculate ghost next direction.
 */
function updateGhosts() {
    ghosts.forEach(ghost => {
        if (ghost.active) {
            if (!detectWallCollisionOnDirection(ghost.x, ghost.y, ghost.direction)) {
                switch (ghost.direction) {
                case 1:
                    ghost.y -= ghost_speed;
                    break;
                case 2:
                    ghost.x += ghost_speed;
                    break;
                case 3:
                    ghost.y += ghost_speed;
                    break;
                case 4:
                    ghost.x -= ghost_speed;
                    break;
                }
            } else {
                ghost.direction = calculateNextDirectionBasedOnPacmanPosition(ghost);
            }
        }
    });
}

function calculateNextDirectionBasedOnPacmanPosition(ghost) {
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;

    // The preferred axis will be x if true, y if false.
    preferredAxis = Math.abs(dx) >= Math.abs(dy);

    // Create an order of choices array. The first value is the choice based on
    // preferred axis and distance and the second is the direction, the ghost,
    // should choose.
    let choices = [
        [!preferredAxis && dx == 0, 1],
        [preferredAxis && dy == 0, 2],
        [!preferredAxis && dx == 0, 3],
        [preferredAxis && dy == 0, 4],
        [!preferredAxis && dy <= 0, 1],
        [preferredAxis && dx >= 0, 2],
        [!preferredAxis && dy >= 0, 3],
        [preferredAxis && dx <= 0, 4],
        [preferredAxis && dy <= 0, 1],
        [!preferredAxis && dx >= 0, 2],
        [preferredAxis && dy >= 0, 3],
        [preferredAxis && dx <= 0, 4]
    ];

    // Reverse array of choices if super pill is active.
    choices = superPillActive ? choices.reverse() : choices;

    for (var i = 0; i < choices.length; i++) {
        if (choices[i][0] && !detectWallCollisionOnDirection(ghost.x, ghost.y, choices[i][1])) {
            return choices[i][1];
        }
    }

    // If no choice found.
    return Math.floor(Math.random() * 4 + 1);
}

function detectGhostPacmanCollision() {
  // If ghosts are not blue, the game is lost and it resets, if ghosts are blue,
    // the ghost is set inactive for some seconds.
    ghosts.forEach(ghost => {
        if (detectObjectsCollision(pacman.x, pacman.y, objectSize, objectSize, ghost.x, ghost.y, objectSize, objectSize, 10)) {
            if (superPillActive) {
                // Disable ghost.
                ghost.active = false;
                ghost.x = 10 + pillDistance * 7;
                ghost.y = 10 + pillDistance * 6;
                setTimeout(function() {
                    ghost.active = true;
                }, 6000);
            } else {
                defeat = true;
            }
        }
    });
}
