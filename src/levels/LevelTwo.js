import { BaseLevel } from "./BaseLevel.js";

export class LevelTwo extends BaseLevel {
    constructor() {
        super({
            id: 2,
            label: "Level 2",
            gravity: 1600,
            background: [255, 182, 193],
            reverseGravity: false,
            doorPosition: { x: 700, y: 480 },
            playerStart: { x: 100, y: 100 },
            respawnPosition: { x: 100, y: 100 },
            coinSpawnRange: { minY: 50, maxY: 500 },
            doorScore: 10,
            platforms: [
                { width: 800, height: 40, x: 0, y: 560, color: [70, 130, 180] },
                { width: 150, height: 30, x: 100, y: 450, color: [255, 140, 0] },
                { width: 150, height: 30, x: 300, y: 350, color: [255, 140, 0] },
                { width: 150, height: 30, x: 550, y: 250, color: [255, 140, 0] },
                { width: 150, height: 30, x: 200, y: 150, color: [255, 140, 0] },
                { width: 150, height: 30, x: 600, y: 100, color: [255, 140, 0] },
            ],
            jumpLimit: 2,
        });
    }
}

