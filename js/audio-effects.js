/**
 * 音效系统 - 小葵的污染体检报告
 * 使用 Web Audio API 生成轻反馈音效
 */

const AudioEffects = {
    ctx: null,
    enabled: true,
    volume: 0.3,

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
     * 播放点击音效 - 清脆的短音
     */
    playClick() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(800, 0.08, 'sine', 0.15);
    },

    /**
     * 播放切换音效 - 稍长的滑音
     */
    playSwitch() {
        if (!this.enabled || !this.ctx) return;
        this.playSlideTone(600, 800, 0.12, 'sine');
    },

    /**
     * 播放成功/确认音效 - 悦耳的双音
     */
    playSuccess() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(523.25, 0.1, 'sine', 0.2); // C5
        setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.2), 80); // E5
    },

    /**
     * 播放康复进度音效 - 渐强的上升音
     */
    playHealProgress(level) {
        if (!this.enabled || !this.ctx) return;
        const baseFreq = 400 + (level * 80);
        this.playSlideTone(baseFreq, baseFreq + 100, 0.2, 'sine');
    },

    /**
     * 播放完全康复音效 - 庆祝和弦
     */
    playFullyHealed() {
        if (!this.enabled || !this.ctx) return;
        // C major chord: C4-E4-G4-C5
        [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.25), i * 60);
        });
    },

    /**
     * 播放悬浮音效 - 轻柔的气泡音
     */
    playHover() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(1200, 0.05, 'sine', 0.08);
    },

    /**
     * 播放错误/警告音效
     */
    playWarning() {
        if (!this.enabled || !this.ctx) return;
        this.playTone(300, 0.15, 'sawtooth', 0.15);
    },

    /**
     * 基础播放单音
     */
    playTone(frequency, duration, type = 'sine', vol = this.volume) {
        if (!this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.frequency.value = frequency;
        osc.type = type;
        
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + duration);
    },

    /**
     * 播放滑音（频率变化）
     */
    playSlideTone(fromFreq, toFreq, duration, type = 'sine') {
        if (!this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(fromFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(toFreq, this.ctx.currentTime + duration * 0.7);
        
        gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + duration);
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
