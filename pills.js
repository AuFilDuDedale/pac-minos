const pillSize = 4;
const pillDistance = 40;

let pills = [];

let collectedPills = 0;

let canvasPill = document.createElement("canvas"), pillContext = canvasPill.getContext("2d");
canvasPill.width = canvasPill.height = pillSize;
pillContext.arc(pillSize / 2, pillSize / 2, pillSize / 2, 0, 2 * Math.PI, false);
pillContext.fillStyle = "#840350";
pillContext.fill();

let canvasSuperPill = document.createElement("canvas"), superPillContext = canvasSuperPill.getContext("2d");
canvasSuperPill.width = canvasSuperPill.height = pillSize * 2;
superPillContext.arc(pillSize, pillSize, pillSize, 0, 2 * Math.PI, false);
superPillContext.fillStyle = "#840350";
superPillContext.fill();

let superPillActive = false;

function createPills() {
  // Initialize.
    if (pills.length == 0) {
    // Get all x,y values.
        for (var x = 23; x <= 570; x = x + pillDistance) {
            for (var y = 23; y <= 570; y = y + pillDistance) {
                // Randomly generate super pill.
                /*if (Math.floor(Math.random() * 100 + 1) > 94) {
                    var pill = [x - 3, y - 3, 1];
                } else {*/
                    var pill = [x, y, 0];
                /*}*/

                pills.push(pill);
            }
        }

    // Remove pills based on collision with walls.
        for (var i = 0; i < pills.length; i++) {
            for (var w = 0; w < walls.length; w++) {
                if (detectObjectsCollision(pills[i][0], pills[i][1], pillSize, pillSize, walls[w][0][0], walls[w][0][1], walls[w][1], walls[w][2], 0)) {
                    // Set to -1000 to keep length and remove from viewport.
                    pills[i][0] = -1000;
                    collectedPills++;
                }
            }
        }
    } else {
        for (var i = 0; i < pills.length; i++) {
            if (pills[i][2] == 1) {
                canvasContext.drawImage(superPillContext.canvas, pills[i][0], pills[i][1]);
            } else {
                canvasContext.drawImage(pillContext.canvas, pills[i][0], pills[i][1]);
            }
        }
    }
}

function detectPillCollision() {
    for (var i = 0; i < pills.length; i++) {
        if (detectObjectsCollision(pacman.x, pacman.y, objectSize, objectSize, pills[i][0], pills[i][1], pillSize, pillSize, 0)) {
            // Set to -1000 to keep length and remove from viewport.
            pills[i][0] = -1000;
            collectedPills++;

            // If it is super pill set chase mode on.
            if (pills[i][2] == 1) {
                superPillActive = true;
                setTimeout(function() {
                    superPillActive = false;
                }, Math.floor(Math.random() * 4000 + 3000));
            }
        }
    }

    // Check win criteria.
    allPillsAreGone = collectedPills >= pills.length;
    if (allPillsAreGone) {
        victory = true;
    }
}