// Enemy class
class Enemy {
    static BASE_SPEED = 80;
    static SPEED_VARIANCE = 40;
    
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = 30;
        this.height = 30;
        this.speed = Enemy.BASE_SPEED + Math.random() * Enemy.SPEED_VARIANCE; // pixels per second
        this.destroyed = false;
        this.rotationSpeed = Math.random() * 2 - 1; // Random rotation
        this.rotation = 0;
    }
    
    update(deltaTime) {
        // Move toward player
        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            this.x += (dx / distance) * this.speed * deltaTime;
            this.y += (dy / distance) * this.speed * deltaTime;
        }
        
        this.rotation += this.rotationSpeed * deltaTime;
        
        // Remove if off screen (bottom)
        if (this.y > this.game.height + 50) {
            this.destroyed = true;
        }
    }
    
    hit() {
        this.destroyed = true;
    }
    
    render(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff00ff';
        
        // Draw skull shape
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-6, -3, 4, 0, Math.PI * 2);
        ctx.arc(6, -3, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Nose
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.lineTo(-3, 8);
        ctx.lineTo(3, 8);
        ctx.closePath();
        ctx.fill();
        
        // Teeth
        ctx.fillStyle = '#000000';
        for (let i = -10; i <= 10; i += 5) {
            ctx.fillRect(i, 8, 3, 5);
        }
        
        ctx.restore();
    }
}
