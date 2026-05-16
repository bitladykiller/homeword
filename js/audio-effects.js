/**
 * 音效系统 - 小葵的污染体检报告
 * 使用 Web Audio API 生成轻反馈音效
 */

const AudioEffects = {
    ctx: null,
    enabled: true,
    volume: 0.18,

    /**
     * 初始化音频上下文
     */
    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    },

    /**
     * 播放点击音效 - 柔和的低频短音
     */
    playClick() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(440, 0.12, 'sine', 0.12, 0.01);
    },

    /**
     * 播放切换音效 - 轻柔的小幅滑音
     */
    playSwitch() {
        if (!this.enabled || !this.ctx) return;
        this.playSlideTone(330, 440, 0.18, 'sine');
    },

    /**
     * 播放成功/确认音效 - 温暖的双音
     */
    playSuccess() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(392, 0.15, 'sine', 0.15, 0.01);   // G4
        setTimeout(() => this.playTone(523.25, 0.2, 'sine', 0.15, 0.01), 100); // C5
    },

    /**
     * 播放康复进度音效 - 渐强的柔和上升音
     */
    playHealProgress(level) {
        if (!this.enabled || !this.ctx) return;
        const baseFreq = 300 + (level * 60);
        this.playSlideTone(baseFreq, baseFreq + 70, 0.25, 'sine');
    },

    /**
     * 播放完全康复音效 - 柔和的庆祝和弦
     */
    playFullyHealed() {
        if (!this.enabled || !this.ctx) return;
        // C major: C4-E4-G4
        [261.63, 329.63, 392.00].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.4, 'sine', 0.15, 0.015), i * 80);
        });
    },

    /**
     * 播放悬浮音效 - 极轻的低频气泡音
     */
    playHover() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(520, 0.08, 'sine', 0.05, 0.005);
    },

    /**
     * 播放警告音效 - 柔和的低频提示
     */
    playWarning() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(220, 0.2, 'sine', 0.15, 0.005);
    },

    /**
     * 基础播放单音 - 带软包络和低通滤波
     */
    playTone(frequency, duration, type = 'sine', vol = this.volume, attack = 0.005) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // 低通滤波器 - 去掉高频尖锐感
        filter.type = 'lowpass';
        filter.frequency.value = 1800;
        filter.Q.value = 0.7;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.value = frequency;
        osc.type = type;

        const now = this.ctx.currentTime;
        // 软包络：快速淡入 + 柔和淡出
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(vol, now + attack);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration + 0.05);
    },

    /**
     * 播放滑音（频率变化）- 带低通滤波
     */
    playSlideTone(fromFreq, toFreq, duration, type = 'sine') {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = 1500;
        filter.Q.value = 0.7;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = type;

        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(fromFreq, now);
        osc.frequency.exponentialRampToValueAtTime(toFreq, now + duration * 0.7);

        // 软包络
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration + 0.05);
    },

    /**
     * 静音/取消静音
     */
    toggleMute() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
};

/**
 * 自动初始化并绑定事件
 */
document.addEventListener('DOMContentLoaded', () => {
    AudioEffects.init();
    
    // 绑定点击音效到按钮和链接
    document.querySelectorAll('button, .nav-link, .exhibition-card, .pollution-card, .repair-card, .plant-card, .exam-btn, .compare-btn, .tab-btn, .toggle-reasons-btn, .action-option, .path-step, .soil-layer-item').forEach(el => {
        el.addEventListener('click', () => AudioEffects.playClick());
        el.addEventListener('mouseenter', () => {
            // 节流悬浮音效
            if (!el.dataset.hoverPlayed) {
                AudioEffects.playHover();
                el.dataset.hoverPlayed = 'true';
                setTimeout(() => delete el.dataset.hoverPlayed, 150);
            }
        });
    });

    // 表单提交成功音效
    const actionForm = document.getElementById('actionForm');
    if (actionForm) {
        actionForm.addEventListener('submit', (e) => {
            const checkedCount = actionForm.querySelectorAll('input[name="action"]:checked').length;
            if (checkedCount === 6) {
                setTimeout(() => AudioEffects.playFullyHealed(), 300);
            } else if (checkedCount > 0) {
                AudioEffects.playSuccess();
            }
        });
    }

    // 康复进度变化音效
    const container = document.getElementById('actionContainer');
    if (container) {
        let lastHealed = 0;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-healed') {
                    const newHealed = parseInt(container.dataset.healed) || 0;
                    if (newHealed > lastHealed) {
                        AudioEffects.playHealProgress(newHealed);
                    }
                    lastHealed = newHealed;
                }
            });
        });
        observer.observe(container, { attributes: true });
    }

    // 卡片翻转音效
    document.querySelectorAll('.plant-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('flipped')) {
                AudioEffects.playSwitch();
            } else {
                AudioEffects.playClick();
            }
        });
    });

    // 标签页切换音效
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => AudioEffects.playSwitch());
    });
});

// 导出供其他脚本使用
window.AudioEffects = AudioEffects;
