/**
 * 花粉跟随特效 - 小葵的污染体检报告
 * 鼠标移动时产生金色花粉粒子
 */

const PollenEffect = {
    canvas: null,
    ctx: null,
    particles: [],
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    isActive: true,
    maxParticles: 50,
    colors: [
        'rgba(244, 196, 48, 0.8)',   // 向日葵黄
        'rgba(255, 230, 120, 0.7)',  // 亮黄
        'rgba(144, 196, 80, 0.6)',   // 浅绿
        'rgba(47, 107, 79, 0.4)',    // 生态绿
    ],

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'pollen-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.spawnParticles();
        });

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
        });

        this.animate();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    spawnParticles() {
        const dx = this.mouseX - this.lastMouseX;
        const dy = this.mouseY - this.lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const count = Math.min(Math.floor(speed / 4) + 1, 3);

        for (let i = 0; i < count; i++) {
            if (this.particles.length >= this.maxParticles) {
                this.particles.shift();
            }
            this.particles.push(this.createParticle());
        }

        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
    },

    createParticle() {
        return {
            x: this.mouseX + (Math.random() - 0.5) * 16,
            y: this.mouseY + (Math.random() - 0.5) * 16,
            size: Math.random() * 3 + 2,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.3,
            life: 1.0,
            decay: Math.random() * 0.012 + 0.008,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
        };
    },

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.015;
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.rotation += p.rotationSpeed;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    },

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = p.life;

            // 绘制花粉光晕
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color.replace(/[\d.]+\)$/, '0.15)');
            this.ctx.fill();

            // 绘制花粉主体
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            this.ctx.restore();
        }
    },

    animate() {
        if (this.isActive) {
            this.updateParticles();
            this.drawParticles();
        }
        requestAnimationFrame(() => this.animate());
    },

    toggle() {
        this.isActive = !this.isActive;
        if (!this.isActive) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles = [];
        }
        return this.isActive;
    }
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => PollenEffect.init(), 500);
});

window.PollenEffect = PollenEffect;
