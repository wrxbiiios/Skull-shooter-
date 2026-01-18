// Game configuration
const CONFIG = {
    canvas: {
        width: 800,
        height: 600
    },
    player: {
        size: 30,
        speed: 5,
        shootCooldown: 250,
        maxHealth: 100
    },
    bullet: {
        size: 5,
        speed: 8,
        color: '#00ffff'
    },
    enemy: {
        size: 25,
        speed: 1.5,
        spawnRate: 2000,
        levelSpeedIncrease: 0.3
    },
    level: {
        enemiesPerLevel: 10,
        completionBonus: 100
    },
    mobile: {
        breakpoint: 768
    }
};

// Game state
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Make canvas responsive for mobile/Telegram
        this.setupCanvas();
        
        this.player = null;
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        
        this.score = 0;
        this.level = 1;
        this.enemiesKilled = 0;
        this.enemiesKilledThisLevel = 0;
        this.isGameOver = false;
        this.isPaused = false;
        
        this.keys = {};
        this.touchKeys = {};
        this.lastShot = 0;
        this.enemySpawnTimer = null;
        
        this.init();
    }
    
    setupCanvas() {
        // Responsive canvas sizing for Telegram
        this.resizeCanvas();
        
        // Handle window resize for Telegram
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    resizeCanvas() {
        const isMobile = window.innerWidth <= CONFIG.mobile.breakpoint;
        if (isMobile) {
            const maxWidth = Math.min(window.innerWidth - 40, 600);
            const maxHeight = Math.min(window.innerHeight * 0.5, 450);
            this.canvas.width = maxWidth;
            this.canvas.height = maxHeight;
            CONFIG.canvas.width = maxWidth;
            CONFIG.canvas.height = maxHeight;
        } else {
            this.canvas.width = CONFIG.canvas.width;
            this.canvas.height = CONFIG.canvas.height;
        }
    }

    init() {
        this.player = new Player(
            CONFIG.canvas.width / 2,
            CONFIG.canvas.height / 2,
            this
        );
        
        this.setupEventListeners();
        this.startEnemySpawning();
        this.gameLoop();
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Shooting
            if (e.key === ' ' && !this.isPaused && !this.isGameOver) {
                e.preventDefault();
                this.shoot();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Touch controls for mobile/Telegram
        this.setupTouchControls();

        // Modal buttons
        document.getElementById('nextLevel').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('restart').addEventListener('click', () => {
            this.restart();
        });
    }
    
    setupTouchControls() {
        const touchButtons = document.querySelectorAll('.touch-btn');
        
        touchButtons.forEach(btn => {
            // Handle direction buttons
            const direction = btn.getAttribute('data-direction');
            const action = btn.getAttribute('data-action');
            
            if (direction) {
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.touchKeys[direction] = true;
                });
                
                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this.touchKeys[direction] = false;
                });
                
                btn.addEventListener('touchcancel', (e) => {
                    e.preventDefault();
                    this.touchKeys[direction] = false;
                });
            }
            
            // Handle shoot button
            if (action === 'shoot') {
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    if (!this.isPaused && !this.isGameOver) {
                        this.shoot();
                    }
                });
            }
        });
    }

    startEnemySpawning() {
        const spawnRate = Math.max(1000, CONFIG.enemy.spawnRate - (this.level * 100));
        
        this.enemySpawnTimer = setInterval(() => {
            if (!this.isPaused && !this.isGameOver) {
                this.spawnEnemy();
            }
        }, spawnRate);
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        
        switch(side) {
            case 0: // Top
                x = Math.random() * CONFIG.canvas.width;
                y = -CONFIG.enemy.size;
                break;
            case 1: // Right
                x = CONFIG.canvas.width + CONFIG.enemy.size;
                y = Math.random() * CONFIG.canvas.height;
                break;
            case 2: // Bottom
                x = Math.random() * CONFIG.canvas.width;
                y = CONFIG.canvas.height + CONFIG.enemy.size;
                break;
            case 3: // Left
                x = -CONFIG.enemy.size;
                y = Math.random() * CONFIG.canvas.height;
                break;
        }
        
        this.enemies.push(new Enemy(x, y, this.level));
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastShot < CONFIG.player.shootCooldown) return;
        
        this.lastShot = now;
        
        // Shoot in 4 directions for cyberpunk effect
        const directions = [
            { dx: 0, dy: -1 },  // Up
            { dx: 1, dy: 0 },   // Right
            { dx: 0, dy: 1 },   // Down
            { dx: -1, dy: 0 }   // Left
        ];
        
        directions.forEach(dir => {
            this.bullets.push(new Bullet(
                this.player.x,
                this.player.y,
                dir.dx,
                dir.dy
            ));
        });
    }

    update() {
        if (this.isPaused || this.isGameOver) return;

        // Update player
        this.player.update(this.keys);

        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            return bullet.isAlive();
        });

        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(this.player);
            
            // Check collision with player
            if (this.checkCollision(enemy, this.player)) {
                this.player.takeDamage(10);
                enemy.alive = false;
                this.createExplosion(enemy.x, enemy.y, '#ff0000');
                
                if (this.player.health <= 0) {
                    this.gameOver();
                }
            }
        });

        // Check bullet-enemy collisions
        this.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (bullet.alive && enemy.alive && this.checkCollision(bullet, enemy)) {
                    bullet.alive = false;
                    enemy.alive = false;
                    this.score += 10;
                    this.enemiesKilled++;
                    this.enemiesKilledThisLevel++;
                    this.createExplosion(enemy.x, enemy.y, '#00ffff');
                    
                    // Check level completion
                    if (this.enemiesKilledThisLevel >= CONFIG.level.enemiesPerLevel) {
                        this.completeLevel();
                    }
                }
            });
        });

        this.enemies = this.enemies.filter(enemy => enemy.alive);

        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.alive;
        });

        this.updateUI();
    }

    checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (obj1.size + obj2.size) / 2;
    }

    createExplosion(x, y, color) {
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            const speed = Math.random() * 3 + 2;
            this.particles.push(new Particle(x, y, angle, speed, color));
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0014';
        this.ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);

        // Draw grid effect
        this.drawGrid();

        // Draw particles
        this.particles.forEach(particle => particle.draw(this.ctx));

        // Draw bullets
        this.bullets.forEach(bullet => bullet.draw(this.ctx));

        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        // Draw player
        this.player.draw(this.ctx);
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        const gridSize = 50;
        for (let x = 0; x < CONFIG.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, CONFIG.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < CONFIG.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(CONFIG.canvas.width, y);
            this.ctx.stroke();
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('health').textContent = Math.max(0, this.player.health);
        document.getElementById('enemiesKilled').textContent = this.enemiesKilled;
    }

    completeLevel() {
        this.isPaused = true;
        clearInterval(this.enemySpawnTimer);
        
        this.score += CONFIG.level.completionBonus;
        
        const modal = document.getElementById('levelComplete');
        const stats = document.getElementById('levelStats');
        stats.textContent = `Score: ${this.score} | Enemies Defeated: ${this.enemiesKilled}`;
        modal.classList.remove('hidden');
    }

    nextLevel() {
        this.level++;
        this.enemiesKilledThisLevel = 0;
        this.enemies = [];
        this.bullets = [];
        this.isPaused = false;
        
        // Restore some health on level up
        this.player.health = Math.min(CONFIG.player.maxHealth, this.player.health + 30);
        
        document.getElementById('levelComplete').classList.add('hidden');
        this.startEnemySpawning();
    }

    gameOver() {
        this.isGameOver = true;
        clearInterval(this.enemySpawnTimer);
        
        const modal = document.getElementById('gameOver');
        const stats = document.getElementById('finalStats');
        stats.textContent = `Final Score: ${this.score} | Level Reached: ${this.level} | Enemies Defeated: ${this.enemiesKilled}`;
        modal.classList.remove('hidden');
    }

    restart() {
        document.getElementById('gameOver').classList.add('hidden');
        clearInterval(this.enemySpawnTimer);
        
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        this.score = 0;
        this.level = 1;
        this.enemiesKilled = 0;
        this.enemiesKilledThisLevel = 0;
        this.isGameOver = false;
        this.isPaused = false;
        
        this.player = new Player(
            CONFIG.canvas.width / 2,
            CONFIG.canvas.height / 2,
            this
        );
        
        this.startEnemySpawning();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Player class
class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.player.size;
        this.speed = CONFIG.player.speed;
        this.health = CONFIG.player.maxHealth;
        this.game = game;
    }

    update(keys) {
        // Movement - support both keyboard and touch controls
        const touchKeys = this.game ? this.game.touchKeys : {};
        
        if (keys['w'] || keys['arrowup'] || touchKeys['up']) {
            this.y = Math.max(this.size / 2, this.y - this.speed);
        }
        if (keys['s'] || keys['arrowdown'] || touchKeys['down']) {
            this.y = Math.min(CONFIG.canvas.height - this.size / 2, this.y + this.speed);
        }
        if (keys['a'] || keys['arrowleft'] || touchKeys['left']) {
            this.x = Math.max(this.size / 2, this.x - this.speed);
        }
        if (keys['d'] || keys['arrowright'] || touchKeys['right']) {
            this.x = Math.min(CONFIG.canvas.width - this.size / 2, this.x + this.speed);
        }
    }

    takeDamage(amount) {
        this.health -= amount;
    }

    draw(ctx) {
        // Draw skull shape
        ctx.save();
        
        // Outer glow
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 20;
        
        // Head
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x - this.size / 6, this.y - this.size / 8, this.size / 8, 0, Math.PI * 2);
        ctx.arc(this.x + this.size / 6, this.y - this.size / 8, this.size / 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Nose
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.moveTo(this.x - this.size / 10, this.y + this.size / 12);
        ctx.lineTo(this.x + this.size / 10, this.y + this.size / 12);
        ctx.lineTo(this.x, this.y + this.size / 4);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

// Enemy class
class Enemy {
    constructor(x, y, level) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.enemy.size;
        this.speed = CONFIG.enemy.speed + (level - 1) * CONFIG.enemy.levelSpeedIncrease;
        this.alive = true;
    }

    update(player) {
        // Move towards player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }

    draw(ctx) {
        ctx.save();
        
        // Outer glow
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 15;
        
        // Body
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#ffff00';
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x - this.size / 6, this.y - this.size / 8, this.size / 10, 0, Math.PI * 2);
        ctx.arc(this.x + this.size / 6, this.y - this.size / 8, this.size / 10, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Bullet class
class Bullet {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.bullet.size;
        this.dx = dx * CONFIG.bullet.speed;
        this.dy = dy * CONFIG.bullet.speed;
        this.alive = true;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    isAlive() {
        return this.alive && 
               this.x > 0 && 
               this.x < CONFIG.canvas.width && 
               this.y > 0 && 
               this.y < CONFIG.canvas.height;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = CONFIG.bullet.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = CONFIG.bullet.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Particle class for explosions
class Particle {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 3 + 2;
        this.color = color;
        this.alpha = 1;
        this.alive = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.size *= 0.95;
        
        if (this.alpha <= 0 || this.size <= 0.1) {
            this.alive = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Start the game when page loads
window.addEventListener('load', () => {
    window.game = new Game();
});
