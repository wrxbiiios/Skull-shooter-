// Skull Shooter Game
class SkullShooter {
    // Game configuration constants
    static SKULL_SIZE = 40;
    static SKULL_MIN_SPEED = 0.5;
    static SKULL_MAX_SPEED = 2.0;
    static SPAWN_INTERVAL = 1000; // milliseconds
    static POINTS_PER_SKULL = 10;
    static CANVAS_WIDTH = 600;
    static CANVAS_HEIGHT = 400;
    
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameRunning = false;
        this.skulls = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = SkullShooter.SPAWN_INTERVAL;
        
        this.setupCanvas();
        this.setupEventListeners();
    }
    
    setupCanvas() {
        this.canvas.width = SkullShooter.CANVAS_WIDTH;
        this.canvas.height = SkullShooter.CANVAS_HEIGHT;
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        document.getElementById('start-btn').addEventListener('click', () => this.start());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());
    }
    
    start() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gameLoop();
        }
    }
    
    reset() {
        this.gameRunning = false;
        this.score = 0;
        this.skulls = [];
        this.updateScore();
        this.clear();
    }
    
    spawnSkull() {
        const skull = {
            x: Math.random() * (this.canvas.width - SkullShooter.SKULL_SIZE),
            y: Math.random() * (this.canvas.height - SkullShooter.SKULL_SIZE),
            size: SkullShooter.SKULL_SIZE,
            speed: SkullShooter.SKULL_MIN_SPEED + Math.random() * (SkullShooter.SKULL_MAX_SPEED - SkullShooter.SKULL_MIN_SPEED),
            direction: Math.random() * Math.PI * 2
        };
        this.skulls.push(skull);
    }
    
    updateSkulls() {
        this.skulls.forEach(skull => {
            skull.x += Math.cos(skull.direction) * skull.speed;
            skull.y += Math.sin(skull.direction) * skull.speed;
            
            // Bounce off walls
            if (skull.x <= 0 || skull.x >= this.canvas.width - skull.size) {
                skull.direction = Math.PI - skull.direction;
            }
            if (skull.y <= 0 || skull.y >= this.canvas.height - skull.size) {
                skull.direction = -skull.direction;
            }
            
            // Keep within bounds
            skull.x = Math.max(0, Math.min(this.canvas.width - skull.size, skull.x));
            skull.y = Math.max(0, Math.min(this.canvas.height - skull.size, skull.y));
        });
    }
    
    drawSkulls() {
        this.skulls.forEach(skull => {
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.beginPath();
            this.ctx.arc(skull.x + skull.size / 2, skull.y + skull.size / 2, skull.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw simple skull face
            this.ctx.fillStyle = '#000';
            // Eyes
            this.ctx.fillRect(skull.x + 10, skull.y + 12, 8, 8);
            this.ctx.fillRect(skull.x + 22, skull.y + 12, 8, 8);
            // Nose
            this.ctx.fillRect(skull.x + 16, skull.y + 22, 8, 6);
        });
    }
    
    handleClick(e) {
        if (!this.gameRunning) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if click hit any skull
        for (let i = this.skulls.length - 1; i >= 0; i--) {
            const skull = this.skulls[i];
            const dx = x - (skull.x + skull.size / 2);
            const dy = y - (skull.y + skull.size / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < skull.size / 2) {
                this.skulls.splice(i, 1);
                this.score += SkullShooter.POINTS_PER_SKULL;
                this.updateScore();
                break;
            }
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        const currentTime = Date.now();
        
        // Spawn new skulls
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            this.spawnSkull();
            this.lastSpawnTime = currentTime;
        }
        
        // Update and draw
        this.updateSkulls();
        this.clear();
        this.drawSkulls();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new SkullShooter();
});
