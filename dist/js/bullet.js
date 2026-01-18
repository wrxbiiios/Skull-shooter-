// Bullet class
class Bullet {
    constructor(x, y, vx, vy, game) {
        this.x = x;
        this.y = y;
        this.vx = vx; // velocity x
        this.vy = vy; // velocity y
        this.game = game;
        this.width = 5;
        this.height = 10;
        this.destroyed = false;
    }
    
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
    }
    
    render(ctx) {
        ctx.save();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff00';
        
        // Draw bullet
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Trail effect
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(this.x, this.y + this.height, this.width, 10);
        
        ctx.restore();
    }
}
