# Skull Shooter 💀⚡

An interactive cyberpunk-themed shooter game built with HTML5 Canvas and vanilla JavaScript.

## 🎮 Features

- **Player Movement**: Control your ship with arrow keys or WASD
- **Shooting Mechanic**: Fire bullets with the space bar
- **Enemy AI**: Skull enemies that track and chase the player
- **Collision Detection**: Real-time detection for bullets vs enemies and enemies vs player
- **Level Progression**: Advance through levels as you defeat enemies
- **Score Tracking**: Earn points for each enemy destroyed
- **Particle Effects**: Cyberpunk explosion effects on collisions
- **Game Over & Restart**: Full game state management

## 🎯 Controls

- **Move**: `WASD` or `Arrow Keys`
- **Shoot**: `SPACE`
- **Restart**: `R` (when game over)

## 🚀 Play Now

Open `dist/index.html` in a web browser to start playing!

## 📦 Technical Details

- **Total Size**: ~44KB (lightweight and perfect for Telegram embedding)
- **Technology**: HTML5 Canvas, ES6+ JavaScript
- **Architecture**: Modular class-based design
- **Performance**: 60 FPS gameplay with optimized collision detection

## 🎨 Cyberpunk Theme

The game features a neon-lit cyberpunk aesthetic with:
- Cyan (#00ffff) player ship with glow effects
- Magenta (#ff00ff) skull enemies
- Green (#00ff00) bullets
- Dark gradient background with grid overlay
- Particle explosion effects

## 📁 Project Structure

```
dist/
├── index.html          # Main game page
└── js/
    ├── game.js         # Main game controller
    ├── player.js       # Player class
    ├── enemy.js        # Enemy class
    ├── bullet.js       # Bullet class
    ├── particle.js     # Particle effects
    └── main.js         # Entry point
```

## 🔧 Development

The game uses vanilla JavaScript with no external dependencies, making it easy to deploy anywhere.

## 📱 Deployment

Optimized for:
- Web browsers (desktop and mobile)
- Telegram WebApp embedding
- Static hosting platforms (Vercel, GitHub Pages, etc.)
