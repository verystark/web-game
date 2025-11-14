export class PlatformerGame {
    constructor({
        width = 800,
        height = 600,
        background = [135, 206, 235],
        levels = [],
        maxJumps = 2,
    }) {
        this.width = width;
        this.height = height;
        this.background = background;
        this.levelClasses = levels;

        this.score = 0;
        this.jumpCount = 0;
        this.defaultMaxJumps = maxJumps;
        this.maxJumps = maxJumps;
        this.platforms = [];
        this.door = null;
        this.currentLevelIndex = 0;
        this.currentLevel = null;

        this.scoreLabel = null;
        this.levelLabel = null;
        this.player = null;
    }

    init() {
        kaboom({
            width: this.width,
            height: this.height,
            background: this.background,
        });

        this.createHud();
        this.createPlayer();
        this.registerInputHandlers();
        this.loadLevel(0);
    }

    createHud() {
        this.scoreLabel = add([
            text("Score: 0", { size: 20 }),
            pos(10, 10),
            fixed(),
            color(255, 255, 255),
        ]);

        this.levelLabel = add([
            text("Level: 1", { size: 20 }),
            pos(10, 35),
            fixed(),
            color(255, 255, 255),
        ]);

        add([
            text("Arrow Keys: Move | Space: Jump", { size: 16 }),
            pos(10, 60),
            color(255, 255, 255),
            fixed(),
        ]);
    }

    createPlayer() {
        this.player = add([
            rect(40, 40),
            pos(100, 100),
            area(),
            body(),
            color(255, 100, 100),
            "player",
        ]);

        this.player.onCollide("coin", (coin) => this.handleCoinCollision(coin));
        this.player.onCollide("door", () => this.handleDoorCollision());
        this.player.onUpdate(() => this.handlePlayerUpdate());
    }

    registerInputHandlers() {
        onKeyDown("left", () => {
            this.player.move(-200, 0);
        });

        onKeyDown("right", () => {
            this.player.move(200, 0);
        });

        onKeyPress("space", () => {
            if (this.isPlayerGrounded() || this.jumpCount < this.maxJumps) {
                if (this.currentLevel?.reverseGravity) {
                    this.player.jump(-600);
                } else {
                    this.player.jump(600);
                }
                this.jumpCount += 1;
            }
        });
    }

    loadLevel(index) {
        this.clearLevel();

        this.currentLevelIndex = index;
        const LevelClass = this.levelClasses[index];
        this.currentLevel = new LevelClass();

        this.levelLabel.text = this.currentLevel.label;
        this.currentLevel.setup(this);
        this.maxJumps = this.currentLevel.getJumpLimit?.() ?? this.defaultMaxJumps;

        this.player.pos = this.currentLevel.getPlayerStart();
        this.jumpCount = 0;

        this.spawnCoin();
    }

    clearLevel() {
        destroyAll("platform");
        destroyAll("coin");

        if (this.door) {
            destroy(this.door);
            this.door = null;
        }

        this.platforms = [];
    }

    addPlatform({ width, height, x, y, color: colorValue }) {
        const platform = add([
            rect(width, height),
            pos(x, y),
            area(),
            body({ isStatic: true }),
            color(...colorValue),
            "platform",
        ]);

        this.platforms.push(platform);
        return platform;
    }

    spawnCoin() {
        if (!this.currentLevel) {
            return;
        }

        const { minY, maxY } = this.currentLevel.getCoinSpawnRange();

        add([
            circle(15),
            pos(rand(50, width() - 50), rand(minY, maxY)),
            area(),
            color(255, 223, 0),
            "coin",
        ]);
    }

    handleCoinCollision(coin) {
        destroy(coin);
        this.score += 1;
        this.scoreLabel.text = `Score: ${this.score}`;

        if (this.currentLevel?.canSpawnDoor() && !this.door && this.currentLevel.shouldOpenDoor(this.score)) {
            this.spawnDoor();
        }

        this.spawnCoin();
    }

    spawnDoor() {
        if (this.door || !this.currentLevel?.canSpawnDoor()) {
            return;
        }

        const doorPosition = this.currentLevel.getDoorPosition();

        this.door = add([
            rect(50, 80),
            pos(doorPosition),
            area(),
            color(139, 0, 139),
            "door",
        ]);
    }

    handleDoorCollision() {
        if (!this.currentLevel?.canSpawnDoor()) {
            return;
        }

        this.advanceLevel();
    }

    advanceLevel() {
        const hasNextLevel = this.currentLevelIndex < this.levelClasses.length - 1;

        if (hasNextLevel) {
            this.loadLevel(this.currentLevelIndex + 1);
        } else {
            this.resetGame();
        }
    }

    resetGame() {
        this.score = 0;
        this.scoreLabel.text = "Score: 0";
        this.loadLevel(0);
    }

    handlePlayerUpdate() {
        if (this.isPlayerGrounded()) {
            this.jumpCount = 0;
        }

        if (this.currentLevel?.reverseGravity) {
            this.handleReverseOneWayPlatforms();
        }

        if (this.player.pos.x < 0) {
            this.player.pos.x = 0;
        }

        if (this.player.pos.x > width() - this.player.width) {
            this.player.pos.x = width() - this.player.width;
        }

        const respawnPosition = this.currentLevel?.getRespawnPosition() ?? vec2(100, 100);

        if (this.currentLevel?.reverseGravity) {
            if (this.player.pos.y < -50) {
                this.player.pos = respawnPosition;
                this.jumpCount = 0;
            }
        } else if (this.player.pos.y > height()) {
            this.player.pos = respawnPosition;
            this.jumpCount = 0;
        }
    }

    isPlayerGrounded() {
        if (!this.player) {
            return false;
        }

        const playerBottom = this.player.pos.y + this.player.height;
        const playerTop = this.player.pos.y;
        const playerLeft = this.player.pos.x;
        const playerRight = this.player.pos.x + this.player.width;
        const threshold = 10;

        for (const platform of this.platforms) {
            const platformTop = platform.pos.y;
            const platformBottom = platform.pos.y + platform.height;
            const platformLeft = platform.pos.x;
            const platformRight = platform.pos.x + platform.width;

            const overlappingHorizontally = playerRight > platformLeft && playerLeft < platformRight;

            if (this.currentLevel?.reverseGravity) {
                if (
                    overlappingHorizontally &&
                    playerTop <= platformBottom + threshold &&
                    playerTop >= platformBottom - threshold
                ) {
                    return true;
                }
            } else if (
                overlappingHorizontally &&
                playerBottom >= platformTop - threshold &&
                playerBottom <= platformTop + threshold
            ) {
                return true;
            }
        }

        return false;
    }

    handleReverseOneWayPlatforms() {
        if (!this.currentLevel?.reverseGravity) {
            return;
        }

        const playerBottom = this.player.pos.y + this.player.height;
        const playerTop = this.player.pos.y;
        const playerLeft = this.player.pos.x;
        const playerRight = this.player.pos.x + this.player.width;
        const threshold = 4;

        for (const platform of this.platforms) {
            const platformTop = platform.pos.y;
            const platformBottom = platform.pos.y + platform.height;
            const platformLeft = platform.pos.x;
            const platformRight = platform.pos.x + platform.width;

            const overlappingHorizontally = playerRight > platformLeft && playerLeft < platformRight;
            const touchingTopSurface =
                playerBottom >= platformTop - threshold && playerBottom <= platformTop + threshold;

            if (overlappingHorizontally && touchingTopSurface && this.player.vel.y > 0) {
                this.player.pos.y = platformBottom + 2;
                break;
            }

            const touchingUnderside =
                playerTop <= platformBottom + threshold && playerTop >= platformBottom - threshold;

            if (overlappingHorizontally && touchingUnderside && this.player.vel.y < 0) {
                this.player.pos.y = platformBottom + 2;
                this.player.vel.y = 0;
                this.jumpCount = 0;
                break;
            }
        }
    }
}

