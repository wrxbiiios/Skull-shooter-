// Player class
class Player {
    static DAMAGE_PER_HIT = 20;
    
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = 30;
        this.height = 30;
        this.speed = 250; // pixels per second
        this.health = 100;
        this.maxHealth = 100;
        this.shootCooldown = 0.15; // seconds
        this.lastShot = 0;
    }
    
    update(deltaTime) {
        // Handle movement with arrow keys or WASD
        const keys = this.game.keys;
        let dx = 0;
        let dy = 0;
        
        if (keys['arrowleft'] || keys['a']) dx -= 1;
        if (keys['arrowright'] || keys['d']) dx += 1;
        if (keys['arrowup'] || keys['w']) dy -= 1;
        if (keys['arrowdown'] || keys['s']) dy += 1;
        
        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
        }
        
        // Update position
        this.x += dx * this.speed * deltaTime;
        this.y += dy * this.speed * deltaTime;
        
        // Keep player in bounds
        this.x = Math.max(0, Math.min(this.game.width - this.width, this.x));
        this.y = Math.max(0, Math.min(this.game.height - this.height, this.y));
    }
    
    shoot() {
        const currentTime = performance.now() / 1000;
        if (currentTime - this.lastShot < this.shootCooldown) return;
        
        this.lastShot = currentTime;
        const bullet = new Bullet(
            this.x + this.width / 2 - 2.5,
            this.y,
            0,
            -400,
            this.game
        );
        this.game.bullets.push(bullet);
    }
    
    hit() {
        this.health -= Player.DAMAGE_PER_HIT;
        if (this.health < 0) this.health = 0;
    }
    
    render(ctx) {
        // Draw player ship with cyberpunk style
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffff';
        
        // Main body
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(-12, 15);
        ctx.lineTo(12, 15);
        ctx.closePath();
        ctx.fill();
        
        // Inner detail
        ctx.fillStyle = '#0088ff';
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-8, 10);
        ctx.lineTo(8, 10);
        ctx.closePath();
        ctx.fill();
        
        // Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}
