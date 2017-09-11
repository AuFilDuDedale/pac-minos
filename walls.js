wallsCreated = false;

var canvasWall = document.createElement("canvas"),
wallContext = canvasWall.getContext("2d");
canvasWall.width = canvasWall.height = 580;
wallContext.strokeStyle = "#FFFFFF";

function createWalls() {
    if (wallsCreated == false) {
        walls = [
            // Outer walls.
            [[0, 0], 570, 10],
            [[560, 0], 10, 570],
            [[0, 560], 570, 10],
            [[0, 0], 10, 570],
            [[0, 0], 10, 570],
            // Ghost wall.
            [[pillDistance * 6, pillDistance * 6], 10 + pillDistance, 10],
            [[pillDistance * 8, pillDistance * 6], 10 + pillDistance, 10],
            [[pillDistance * 6, pillDistance * 7], 10 + pillDistance * 3, 10],
            // Other walls.
            // Upper-left.
            [[pillDistance, pillDistance], 10, 10 + pillDistance],
            [[pillDistance, pillDistance * 3], 10, 10 + pillDistance],
            [[pillDistance, pillDistance * 5], 10, 10 + pillDistance * 3],
            [[pillDistance * 2, pillDistance], 10 + pillDistance * 1, 10],
            [[pillDistance * 4, pillDistance], 10 + pillDistance * 3, 10],
            [[pillDistance, pillDistance * 2], 10 + pillDistance * 3, 10],
            [[pillDistance * 5, pillDistance * 2], 10 + pillDistance * 3, 10],
            [[pillDistance * 2, pillDistance * 3], 10 + pillDistance * 3, 10],
            [[pillDistance * 6, pillDistance * 3], 10 + pillDistance * 1, 10],
            [[pillDistance * 2, pillDistance * 4], 10, 10 + pillDistance * 2],
            [[pillDistance * 2, pillDistance * 7], 10, 10 + pillDistance * 2],
            [[pillDistance * 3, pillDistance * 4], 10, 10 + pillDistance * 3],
            [[pillDistance * 8, pillDistance], 10, 10 + pillDistance],
            [[pillDistance * 8, 0], 10 + pillDistance * 3, 10],
            [[pillDistance * 8, pillDistance * 3], 10, 10 + pillDistance * 2],
            [[pillDistance * 4, pillDistance * 4], 10 + pillDistance * 3, 10],
            [[pillDistance * 5, pillDistance * 5], 10 + pillDistance * 3, 10],
            [[pillDistance * 4, pillDistance * 5], 10, 10 + pillDistance * 2],
            [[pillDistance * 4, pillDistance * 8], 10, 10 + pillDistance],
            [[pillDistance * 3, pillDistance * 8], 10, 10 + pillDistance],
            [[pillDistance * 4, pillDistance * 9], 10 + pillDistance * 2, 10],
            [[pillDistance * 5, pillDistance * 6], 10, 10 + pillDistance * 2],
            [[pillDistance * 6, pillDistance * 8], 10 + pillDistance * 2, 10],
            // Upper-right.
            [[pillDistance * 9, pillDistance], 10, 10 + pillDistance],
            [[pillDistance * 9, pillDistance * 3], 10, 10 + pillDistance * 2],
            [[pillDistance * 10, pillDistance], 10, 10 + pillDistance],
            [[pillDistance * 10, pillDistance * 5], 10, 10 + pillDistance],
            [[pillDistance * 11, pillDistance], 10 + pillDistance * 2, 10],
            [[pillDistance * 11, pillDistance * 2], 10 + pillDistance * 2, 10],
            [[pillDistance * 10, pillDistance * 3], 10 + pillDistance * 2, 10],
            [[pillDistance * 13, pillDistance * 3], 10 + pillDistance, 10],
            [[pillDistance * 10, pillDistance * 4], 10 + pillDistance, 10],
            [[pillDistance * 12, pillDistance * 4], 10 + pillDistance, 10],
            [[pillDistance * 12, pillDistance * 5], 10 + pillDistance, 10],
            [[pillDistance * 11, pillDistance * 6], 10 + pillDistance * 2, 10],
            [[pillDistance * 10, pillDistance * 5], 10 + pillDistance, 10],
            [[pillDistance * 10, pillDistance * 7], 10 + pillDistance, 10],
            [[pillDistance * 12, pillDistance * 7], 10 + pillDistance, 10],
            [[pillDistance * 9, pillDistance * 8], 10 + pillDistance * 4, 10],
            // Lower left.
            [[pillDistance * 1, pillDistance * 9], 10, 10 + pillDistance * 4],
            [[pillDistance * 1, pillDistance * 10], 10 + pillDistance * 3, 10],
            [[pillDistance * 2, pillDistance * 11], 10 + pillDistance * 2, 10],
            [[pillDistance * 2, pillDistance * 12], 10 + pillDistance * 2, 10],
            [[pillDistance * 2, pillDistance * 13], 10 + pillDistance * 3, 10],
            [[pillDistance * 5, pillDistance * 10], 10, 10 + pillDistance * 3],
            [[pillDistance * 6, pillDistance * 10], 10, 10 + pillDistance * 2],
            [[pillDistance * 7, pillDistance * 9], 10 + pillDistance * 2, 10],
            [[pillDistance * 7, pillDistance * 10], 10 + pillDistance * 2, 10],
            [[pillDistance * 7, pillDistance * 11], 10 + pillDistance * 2, 10],
            [[pillDistance * 7, pillDistance * 12], 10 + pillDistance * 2, 10],
            [[pillDistance * 6, pillDistance * 13], 10 + pillDistance * 2, 10],
            // Lower right.
            [[pillDistance * 10, pillDistance * 9], 10, 10 + pillDistance * 3],
            [[pillDistance * 9, pillDistance * 13], 10 + pillDistance, 10],
            [[pillDistance * 11, pillDistance * 9], 10, 10 + pillDistance * 2],
            [[pillDistance * 11, pillDistance * 12], 10, 10 + pillDistance],
            [[pillDistance * 12, pillDistance * 9], 10 + pillDistance, 10],
            [[pillDistance * 12, pillDistance * 10], 10 + pillDistance, 10],
            [[pillDistance * 12, pillDistance * 11], 10 + pillDistance, 10 + pillDistance],
            [[pillDistance * 12, pillDistance * 13], 10 + pillDistance, 10],
        ];
    
        for (var i = 0; i < walls.length; i++) {
            // Get line.
            x = walls[i][0][0];
            y = walls[i][0][1];
            width = walls[i][1];
            height = walls[i][2];

            wallContext.fillStyle = "black";
            wallContext.fillRect(x, y, width, height);
            wallContext.stroke();
        }
        wallsCreated = true;
    } else {
        canvasContext.drawImage(wallContext.canvas, 0, 0);
    }
}