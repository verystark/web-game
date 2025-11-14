import { BaseLevel } from "./BaseLevel.js";

export class LevelThree extends BaseLevel {
    constructor() {
        super({
            id: 3,
            label: "Level 3",
            gravity: -1600,
            background: [20, 20, 30],
            reverseGravity: true,
            doorPosition: { x: 700, y: 20 },
            playerStart: { x: 100, y: 500 },
            respawnPosition: { x: 100, y: 500 },
            coinSpawnRange: { minY: 100, maxY: 550 },
            doorScore: null,
            platforms: [
                { width: 800, height: 40, x: 0, y: 0, color: [50, 50, 50] },
                { width: 150, height: 30, x: 100, y: 150, color: [100, 50, 150] },
                { width: 150, height: 30, x: 300, y: 250, color: [100, 50, 150] },
                { width: 150, height: 30, x: 550, y: 350, color: [100, 50, 150] },
                { width: 150, height: 30, x: 200, y: 450, color: [100, 50, 150] },
                { width: 150, height: 30, x: 600, y: 500, color: [100, 50, 150] },
            ],
            jumpLimit: 3,
        });
    }
}

