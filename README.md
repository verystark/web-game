# Kaboom.js Platformer Game

A simple 2D platformer game built with Kaboom.js featuring a player that can move, jump, collect coins, and progress through multiple levels.

Link to website: https://vibe-coding-slop.vercel.app/

## Features

- **Player Movement**: Move left/right with arrow keys and jump with spacebar
- **Double Jump**: Perform up to two jumps in the air
- **Coin Collection**: Collect yellow coins to increase your score
- **Level Progression**: A purple door appears when you reach 5 coins, allowing you to advance to Level 2
- **Multiple Levels**: Two distinct levels with different platform layouts and backgrounds
- **Simple Graphics**: Uses geometric shapes (squares, rectangles, circles) instead of sprites

## How to Play

1. **Movement**:
   - `Left Arrow` / `Right Arrow`: Move left and right
   - `Space`: Jump (can double jump in the air)

2. **Objective**:
   - Collect yellow coins to increase your score
   - When you reach 5 coins, a purple door will appear on the right side of the ground platform
   - Touch the door to advance to Level 2

3. **Game Mechanics**:
   - The player is a red square
   - Platforms are green and brown rectangles (Level 1) or orange rectangles (Level 2)
   - Coins spawn randomly after collection
   - If you fall off the bottom of the screen, you'll respawn at the starting position

## Game Elements

- **Player**: Red square (40x40 pixels)
- **Platforms**: Rectangular platforms of various sizes
- **Coins**: Yellow circles that can be collected
- **Door**: Purple rectangle that appears when score reaches 5

## Level Information

### Level 1
- Sky blue background
- Green ground platform
- Brown floating platforms
- Collect 5 coins to unlock the door

### Level 2
- Pink background
- Steel blue ground platform
- Orange floating platforms in a different layout
- More challenging platform arrangement

## Technical Details

- **Framework**: Kaboom.js (loaded from CDN)
- **Language**: JavaScript (vanilla)
- **Graphics**: Canvas-based rendering with simple shapes
- **Physics**: Built-in Kaboom.js physics engine with gravity and collision detection

## Running the Game

Simply open `index.html` in a web browser. No build process or dependencies required!

## Browser Compatibility

Works in all modern browsers that support HTML5 Canvas and ES6 JavaScript.

