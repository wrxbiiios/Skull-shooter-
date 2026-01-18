# Cyberpunk Skull Shooter 🔮💀

A cyberpunk-themed, top-view shooter game built with HTML5 Canvas and JavaScript. Features a skull character, enemy spawning, shooting mechanics, level progression, and NFT reward placeholders.

## 🎮 Features

- **Player Controls**: Move with WASD/Arrow Keys, shoot with Space bar
- **Touch Controls**: Mobile-friendly touch controls for Telegram
- **Enemies**: Spawn enemies that chase the player
- **Level Progression**: Defeat 10 enemies to complete each level
- **NFT Rewards**: Placeholder rewards after completing levels
- **Cyberpunk Theme**: Neon colors, glowing effects, and retro aesthetics
- **Responsive Design**: Works on desktop, mobile, and Telegram

## 🚀 Free Deployment Options

### Option 1: Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wrxbiiios/Skull-shooter-)

**Steps:**
1. Fork or clone this repository
2. Sign up for a free account at [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Vercel will auto-detect the configuration and deploy
5. Your game will be live at `https://your-project.vercel.app`

**Or use Vercel CLI:**
```bash
npm install -g vercel
cd Skull-shooter-
vercel
```

### Option 2: GitHub Pages

**Steps:**
1. Go to your repository Settings
2. Navigate to "Pages" section
3. Under "Source", select "main" branch
4. Click "Save"
5. Your game will be live at `https://yourusername.github.io/Skull-shooter-/`

### Option 3: Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wrxbiiios/Skull-shooter-)

**Steps:**
1. Sign up for a free account at [netlify.com](https://netlify.com)
2. Drag and drop the project folder into Netlify's deploy area
3. Or connect your GitHub repository for automatic deployments
4. Your game will be live instantly

### Option 4: Cloudflare Pages

**Steps:**
1. Sign up for a free account at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. No build configuration needed
4. Your game will be live at `https://your-project.pages.dev`

### Option 5: Render

**Steps:**
1. Sign up at [render.com](https://render.com)
2. Create a new "Static Site"
3. Connect your GitHub repository
4. Deploy with zero configuration

## 📱 Telegram Integration

This game is optimized for Telegram Web Apps:

1. Deploy using any method above
2. Create a Telegram Bot using [@BotFather](https://t.me/botfather)
3. Set your game URL as a Web App:
   ```
   /newapp
   /setdomain - your-game-url
   ```
4. Users can play directly in Telegram!

## 🎯 How to Play

- **Movement**: Use WASD or Arrow Keys (or touch controls on mobile)
- **Shoot**: Press Space bar (or tap the shoot button on mobile)
- **Objective**: Defeat 10 enemies per level to progress
- **Survive**: Avoid enemies to keep your health up
- **Rewards**: Complete levels to earn NFT placeholders

## 🛠️ Local Development

To run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/wrxbiiios/Skull-shooter-.git
   cd Skull-shooter-
   ```

2. Open with a local server (required for proper functioning):
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node.js
   npx serve
   
   # Option 3: PHP
   php -S localhost:8000
   ```

3. Open your browser to `http://localhost:8000`

## 📂 Project Structure

```
Skull-shooter-/
├── index.html          # Main game page
├── game.js            # Game logic and mechanics
├── style.css          # Cyberpunk styling
├── vercel.json        # Vercel deployment config
└── README.md          # This file
```

## 🎨 Technologies Used

- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+)
- CSS3 with animations and effects
- Responsive design for all devices

## 🌐 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Telegram Web App browser
- All modern mobile browsers

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 🎮 Game Controls Reference

| Action | Desktop | Mobile/Touch |
|--------|---------|--------------|
| Move Up | W or ↑ | ▲ button |
| Move Down | S or ↓ | ▼ button |
| Move Left | A or ← | ◄ button |
| Move Right | D or → | ► button |
| Shoot | Space | 🔫 button |

## 🏆 Credits

Developed as a cyberpunk-themed shooter for Telegram integration with NFT reward placeholders.
