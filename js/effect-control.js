/**
 * 控制面板UI - 音效与花粉特效开关
 * 浮动在右下角的迷你控制按钮
 */

const ControlPanel = {
    /**
     * 创建控制面板
     */
    init() {
        const panel = document.createElement('div');
        panel.className = 'effect-control-panel';
        panel.innerHTML = `
            <button class="effect-toggle-btn" id="effectToggleBtn" aria-label="打开效果设置" title="效果设置">
                <span class="effect-icon">⚙️</span>
            </button>
            <div class="effect-menu" id="effectMenu" hidden>
                <div class="effect-menu-title">效果设置</div>
                <label class="effect-option">
                    <span class="effect-label">🔊 音效</span>
                    <input type="checkbox" id="audioToggle" checked>
                    <span class="effect-switch"></span>
                </label>
                <label class="effect-option">
                    <span class="effect-label">🌼 花粉特效</span>
                    <input type="checkbox" id="pollenToggle" checked>
                    <span class="effect-switch"></span>
                </label>
            </div>
        `;
        document.body.appendChild(panel);

        // 绑定事件
        const toggleBtn = document.getElementById('effectToggleBtn');
        const menu = document.getElementById('effectMenu');
        const audioToggle = document.getElementById('audioToggle');
        const pollenToggle = document.getElementById('pollenToggle');

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.hidden = !menu.hidden;
        });

        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target)) {
                menu.hidden = true;
            }
        });

        audioToggle.addEventListener('change', (e) => {
            if (window.AudioEffects) {
                window.AudioEffects.enabled = e.target.checked;
                localStorage.setItem('audioEnabled', e.target.checked);
                if (e.target.checked) window.AudioEffects.playClick();
            }
        });

        pollenToggle.addEventListener('change', (e) => {
            if (window.PollenEffect) {
                window.PollenEffect.isActive = e.target.checked;
                if (!e.target.checked) {
                    window.PollenEffect.ctx.clearRect(0, 0, window.PollenEffect.canvas.width, window.PollenEffect.canvas.height);
                    window.PollenEffect.particles = [];
                }
                localStorage.setItem('pollenEnabled', e.target.checked);
            }
        });

        // 恢复用户偏好
        this.restorePreferences(audioToggle, pollenToggle);
    },

    restorePreferences(audioToggle, pollenToggle) {
        const audioEnabled = localStorage.getItem('audioEnabled');
        const pollenEnabled = localStorage.getItem('pollenEnabled');

        if (audioEnabled === 'false') {
            audioToggle.checked = false;
            if (window.AudioEffects) window.AudioEffects.enabled = false;
        }
        if (pollenEnabled === 'false') {
            pollenToggle.checked = false;
            if (window.PollenEffect) window.PollenEffect.isActive = false;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => ControlPanel.init(), 600);
});
