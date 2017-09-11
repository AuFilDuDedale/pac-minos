const objectSize = 30;

const collisionWallMargin = 5;

function detectWallCollisionOnDirection(x, y, direction) {
    switch (direction) {
    case 1:
        return detectObjectWallCollision(x, y - ghost_speed);
    case 2:
        return detectObjectWallCollision(x + ghost_speed, y);
    case 3:
        return detectObjectWallCollision(x, y + ghost_speed);
    case 4:
        return detectObjectWallCollision(x - ghost_speed, y);
    }
}

function detectObjectWallCollision(x, y) {
    for (var i = 0; i < walls.length; i++) {
        if (detectObjectsCollision(x, y, objectSize, objectSize, walls[i][0][0], walls[i][0][1], walls[i][1], walls[i][2], collisionWallMargin)) {
            return true;
        }
    }
    return false;
}

function detectObjectsCollision(x1, y1, w1, h1, x2, y2, w2, h2, collisionMargin) {
    if (x1 < x2 + w2 - collisionMargin && x1 + w1 - collisionMargin > x2 && y1 < y2 + h2 - collisionMargin && h1 + y1 -collisionMargin > y2) {
        return true;
    }
    return false;
}
