// Main game controller
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Game state
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.paused = false;
        
        // Spawn settings
        this.enemySpawnRate = 2000; // ms
        this.lastEnemySpawn = performance.now();
        this.enemiesPerLevel = 10;
        this.enemiesKilled = 0;
        
        // Input state
        this.keys = {};
        
        this.init();
    }
    
    init() {
        // Create player
        this.player = new Player(this.width / 2, this.height - 80, this);
        
        // Setup event listeners
        this.setupInput();
        
        // Start game loop
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    setupInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Shoot on space
            if (e.key === ' ' && !this.gameOver) {
                e.preventDefault();
                this.player.shoot();
            }
            
            // Restart on R
            if (e.key.toLowerCase() === 'r' && this.gameOver) {
                this.restart();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    
    spawnEnemy() {
        const x = Math.random() * (this.width - 40) + 20;
        const y = -30;
        this.enemies.push(new Enemy(x, y, this));
    }
    
    update(deltaTime) {
        if (this.gameOver || this.paused) return;
        
        // Update player
        this.player.update(deltaTime);
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update(deltaTime);
            return bullet.y > 0 && bullet.y < this.height;
        });
        
        // Update enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime));
        this.enemies = this.enemies.filter(enemy => !enemy.destroyed);
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.update(deltaTime);
            return particle.life > 0;
        });
        
        // Spawn enemies
        const currentTime = performance.now();
        if (currentTime - this.lastEnemySpawn > this.enemySpawnRate) {
            this.spawnEnemy();
            this.lastEnemySpawn = currentTime;
        }
        
        // Check collisions
        this.checkCollisions();
        
        // Check level progression
        if (this.enemiesKilled >= this.enemiesPerLevel) {
            this.levelUp();
        }
    }
    
    checkCollisions() {
        // Bullets vs Enemies
        this.bullets.forEach(bullet => {
            if (!bullet.destroyed) {
                this.enemies.forEach(enemy => {
                    if (!enemy.destroyed && this.checkCollision(bullet, enemy)) {
                        enemy.hit();
                        bullet.destroyed = true;
                        this.score += 10;
                        this.enemiesKilled++;
                        
                        // Create explosion particles
                        this.createExplosion(enemy.x, enemy.y, '#ff00ff');
                    }
                });
            }
        });
        
        this.bullets = this.bullets.filter(bullet => !bullet.destroyed);
        
        // Enemies vs Player
        this.enemies.forEach(enemy => {
            if (!enemy.destroyed && this.checkCollision(enemy, this.player)) {
                enemy.destroyed = true;
                this.player.hit();
                this.createExplosion(enemy.x, enemy.y, '#ff0000');
                
                if (this.player.health <= 0) {
                    this.gameOver = true;
                }
            }
        });
    }
    
    checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    createExplosion(x, y, color) {
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 * i) / 10;
            const speed = 100 + Math.random() * 100;
            this.particles.push(new Particle(x, y, angle, speed, color));
        }
    }
    
    levelUp() {
        this.level++;
        this.enemiesKilled = 0;
        this.enemiesPerLevel += 5;
        this.enemySpawnRate = Math.max(800, this.enemySpawnRate - 200);
        
        // Show level up message
        this.showLevelUpMessage();
    }
    
    showLevelUpMessage() {
        // Simple visual feedback
        this.createExplosion(this.width / 2, this.height / 2, '#00ffff');
    }
    
    render() {
        // Clear canvas with cyberpunk gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#0a0a1a');
        gradient.addColorStop(1, '#1a0a2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw grid effect
        this.drawGrid();
        
        // Draw particles (behind)
        this.particles.forEach(particle => particle.render(this.ctx));
        
        // Draw game objects
        this.player.render(this.ctx);
        this.bullets.forEach(bullet => bullet.render(this.ctx));
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        
        // Draw UI
        this.drawUI();
        
        // Draw game over screen
        if (this.gameOver) {
            this.drawGameOver();
        }
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x < this.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }
    
    drawUI() {
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = 'bold 20px "Courier New", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${this.score}`, 20, 30);
        this.ctx.fillText(`LEVEL: ${this.level}`, 20, 60);
        
        // Health bar
        this.ctx.fillStyle = '#ff00ff';
        this.ctx.fillText(`HP:`, 20, 90);
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(70, 75, 100, 20);
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(70, 75, this.player.health, 20);
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(70, 75, 100, 20);
    }
    
    drawGameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.fillStyle = '#ff00ff';
        this.ctx.font = 'bold 48px "Courier New", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2 - 40);
        
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = 'bold 24px "Courier New", monospace';
        this.ctx.fillText(`FINAL SCORE: ${this.score}`, this.width / 2, this.height / 2 + 20);
        this.ctx.fillText(`LEVEL REACHED: ${this.level}`, this.width / 2, this.height / 2 + 60);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '20px "Courier New", monospace';
        this.ctx.fillText('Press R to Restart', this.width / 2, this.height / 2 + 120);
    }
    
    restart() {
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.enemySpawnRate = 2000;
        this.enemiesKilled = 0;
        this.enemiesPerLevel = 10;
        this.player = new Player(this.width / 2, this.height - 80, this);
        this.lastEnemySpawn = performance.now();
    }
    
    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}
