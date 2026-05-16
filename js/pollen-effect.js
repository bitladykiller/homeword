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

/**
 * 向日葵鼠标光标
 * 将系统光标替换为 SVG 向日葵
 */
const SunflowerCursor = {
    cursorEl: null,
    isActive: true,

    init() {
        // 创建光标元素
        this.cursorEl = document.createElement('div');
        this.cursorEl.className = 'sunflower-cursor';
        this.cursorEl.innerHTML = `
            <svg viewBox="0 0 32 32" width="28" height="28">
                <g transform="translate(16,16)">
                    <!-- 花瓣 -->
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(0)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(45)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(90)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(135)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(180)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(225)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(270)"/>
                    <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#F4C430" transform="rotate(315)"/>
                    <!-- 花心 -->
                    <circle cx="0" cy="0" r="5" fill="#8B6914"/>
                    <circle cx="0" cy="0" r="3.5" fill="#6B4F0A"/>
                    <!-- 笑脸 -->
                    <circle cx="-1.5" cy="-1" r="0.8" fill="#3B210F"/>
                    <circle cx="1.5" cy="-1" r="0.8" fill="#3B210F"/>
                    <path d="M -2 1.5 Q 0 3.5 2 1.5" stroke="#3B210F" stroke-width="0.8" fill="none" stroke-linecap="round"/>
                </g>
            </svg>
        `;
        document.body.appendChild(this.cursorEl);

        // 隐藏系统光标
        document.body.style.cursor = 'none';

        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            if (!this.isActive) return;
            this.cursorEl.style.left = (e.clientX - 14) + 'px';
            this.cursorEl.style.top = (e.clientY - 14) + 'px';
        });

        // 鼠标离开窗口时隐藏
        document.addEventListener('mouseleave', () => {
            this.cursorEl.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            if (this.isActive) this.cursorEl.style.opacity = '1';
        });

        // 悬停在可点击元素上时放大
        const clickables = 'a, button, [role="button"], input, textarea, select, .observation-point, .root-point, .path-step, .soil-layer-item, .plant-card, .action-option, .exam-btn, .compare-btn, .tab-btn, .toggle-reasons-btn';
        document.querySelectorAll(clickables).forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (this.isActive) this.cursorEl.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursorEl.classList.remove('cursor-hover');
            });
        });

        // 点击时缩小反馈
        document.addEventListener('mousedown', () => {
            if (this.isActive) this.cursorEl.classList.add('cursor-click');
        });
        document.addEventListener('mouseup', () => {
            this.cursorEl.classList.remove('cursor-click');
        });
    },

    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.cursorEl.style.display = 'block';
            document.body.style.cursor = 'none';
        } else {
            this.cursorEl.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
        return this.isActive;
    }
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => SunflowerCursor.init(), 600);
});

window.SunflowerCursor = SunflowerCursor;
