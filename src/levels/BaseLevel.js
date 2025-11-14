export class BaseLevel {
    constructor({
        id,
        label,
        gravity = 1600,
        background = [0, 0, 0],
        reverseGravity = false,
        doorPosition = { x: 700, y: 480 },
        playerStart = { x: 100, y: 100 },
        respawnPosition = playerStart,
        coinSpawnRange = { minY: 50, maxY: 500 },
        doorScore = null,
        platforms = [],
        jumpLimit = 2,
    }) {
        this.id = id;
        this.label = label;
        this.gravity = gravity;
        this.background = background;
        this.reverseGravity = reverseGravity;
        this.doorPosition = doorPosition;
        this.playerStart = playerStart;
        this.respawnPosition = respawnPosition;
        this.coinSpawnRange = coinSpawnRange;
        this.doorScore = doorScore;
        this.platforms = platforms;
        this.jumpLimit = jumpLimit;
    }

    setup(game) {
        setGravity(this.gravity);
        setBackground(this.background);
        this.platforms.forEach((platform) => {
            game.addPlatform(platform);
        });
    }

    getPlayerStart() {
        return vec2(this.playerStart.x, this.playerStart.y);
    }

    getRespawnPosition() {
        return vec2(this.respawnPosition.x, this.respawnPosition.y);
    }

    getDoorPosition() {
        return vec2(this.doorPosition.x, this.doorPosition.y);
    }

    getCoinSpawnRange() {
        return this.coinSpawnRange;
    }

    getJumpLimit() {
        return this.jumpLimit;
    }

    shouldOpenDoor(score) {
        if (this.doorScore === null) {
            return false;
        }
        return score >= this.doorScore;
    }

    canSpawnDoor() {
        return this.doorScore !== null;
    }
}

