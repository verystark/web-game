import { BaseLevel } from "./BaseLevel.js";

export class LevelOne extends BaseLevel {
    constructor() {
        super({
            id: 1,
            label: "Level 1",
            gravity: 1600,
            background: [135, 206, 235],
            reverseGravity: false,
            doorPosition: { x: 700, y: 480 },
            playerStart: { x: 100, y: 100 },
            respawnPosition: { x: 100, y: 100 },
            coinSpawnRange: { minY: 50, maxY: 500 },
            doorScore: 5,
            platforms: [
                { width: 800, height: 40, x: 0, y: 560, color: [34, 139, 34] },
                { width: 200, height: 30, x: 200, y: 400, color: [139, 69, 19] },
                { width: 200, height: 30, x: 500, y: 300, color: [139, 69, 19] },
                { width: 150, height: 30, x: 100, y: 200, color: [139, 69, 19] },
            ],
            jumpLimit: 2,
        });
    }
}

