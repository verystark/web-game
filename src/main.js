import { PlatformerGame } from "./PlatformerGame.js";
import { LevelOne } from "./levels/LevelOne.js";
import { LevelTwo } from "./levels/LevelTwo.js";
import { LevelThree } from "./levels/LevelThree.js";

const game = new PlatformerGame({
    width: 800,
    height: 600,
    background: [135, 206, 235],
    levels: [LevelOne, LevelTwo, LevelThree],
    maxJumps: 2,
});

game.init();

