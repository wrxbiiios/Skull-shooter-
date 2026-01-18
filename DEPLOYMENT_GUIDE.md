# 🚀 Deployment Guide - Cyberpunk Skull Shooter

This guide will help you deploy your game to free hosting platforms in just a few minutes.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Fastest) ⚡

**Method A: One-Click Deploy**
1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wrxbiiios/Skull-shooter-)
2. Sign in with GitHub
3. Click "Deploy"
4. Done! Your game is live at `https://your-project.vercel.app`

**Method B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import `wrxbiiios/Skull-shooter-`
5. Click "Deploy" (no configuration needed)
6. Your game is live in ~30 seconds!

**Method C: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your project
cd Skull-shooter-

# Deploy
vercel

# Follow the prompts (press Enter to accept defaults)
```

### Option 2: Netlify (Drag & Drop) 📦

**Method A: Drag and Drop**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your project folder onto the page
3. Done! Your game is live at `https://random-name.netlify.app`

**Method B: Connect GitHub**
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub → Select `wrxbiiios/Skull-shooter-`
5. Click "Deploy site" (no build settings needed)
6. Your game is live!

### Option 3: GitHub Pages (Free GitHub Hosting) 📄

1. Go to your repository: `https://github.com/wrxbiiios/Skull-shooter-`
2. Click "Settings" tab
3. Scroll to "Pages" section in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes
7. Your game is live at `https://wrxbiiios.github.io/Skull-shooter-/`

### Option 4: Cloudflare Pages ☁️

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign in with GitHub
3. Click "Create a project"
4. Select `wrxbiiios/Skull-shooter-`
5. Click "Begin setup"
6. Leave all settings as default
7. Click "Save and Deploy"
8. Your game is live at `https://skull-shooter.pages.dev`

### Option 5: Render (Static Site) 🎨

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New" → "Static Site"
4. Connect `wrxbiiios/Skull-shooter-`
5. Settings:
   - Build Command: (leave empty)
   - Publish Directory: `.` (current directory)
6. Click "Create Static Site"
7. Your game is live!

## Telegram Integration

After deploying, you can add your game to Telegram:

### Create a Telegram Web App

1. Open Telegram and find [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow instructions to create a bot
3. Send `/newapp` to create a web app
4. Choose your bot
5. Enter your game details:
   - Title: `Cyberpunk Skull Shooter`
   - Description: `A cyberpunk-themed shooter game`
   - Photo: Upload a screenshot
   - Demo: Your deployed URL (e.g., `https://your-game.vercel.app`)
6. Send `/mybots` → Select your bot → "Edit Bot" → "Edit Bot Settings" → "Menu Button"
7. Set the URL to your deployed game
8. Users can now play your game directly in Telegram!

## Verify Deployment

After deploying, test these features:

- ✅ Game loads without errors
- ✅ Player can move with WASD/Arrow keys
- ✅ Space bar shoots bullets
- ✅ Enemies spawn and chase player
- ✅ Touch controls work on mobile
- ✅ Level completion shows NFT reward message
- ✅ Game over and restart work correctly

## Custom Domain (Optional)

All platforms support custom domains for free:

**Vercel:**
- Go to Project Settings → Domains
- Add your domain and follow DNS instructions

**Netlify:**
- Go to Site Settings → Domain Management
- Add custom domain

**Cloudflare Pages:**
- Go to Custom Domains
- Add your domain (instant if using Cloudflare DNS)

## Troubleshooting

**Game doesn't load:**
- Clear browser cache
- Check browser console for errors (F12)
- Ensure all files were uploaded

**Touch controls not working:**
- Try on a real mobile device (not desktop)
- Check that JavaScript is enabled

**Deployment failed:**
- Verify all files are committed to GitHub
- Check deployment logs for errors
- Try a different platform

## Need Help?

- Check deployment platform documentation
- Open an issue on GitHub
- Verify files are in the repository root

## Performance Tips

Your game is already optimized, but you can:

1. Enable CDN (automatic on all platforms)
2. Add custom domain for better branding
3. Enable HTTPS (automatic on all platforms)
4. Monitor with analytics (optional)

## Next Steps

After deployment:

1. Share your game URL with friends
2. Add to Telegram as a Web App
3. Test on different devices
4. Gather feedback
5. Iterate and improve!

---

**Estimated deployment time:** 2-5 minutes  
**Cost:** $0 (all platforms are free for static sites)  
**Recommended:** Vercel (fastest and easiest)
