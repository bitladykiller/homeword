/**
 * 滚动到底彩蛋 + 页面切换转场动画
 */

// ==================== 滚动到底彩蛋 ====================
const ScrollBottomEgg = {
    el: null,
    isShown: false,
    messages: [
        '你已经看到底啦！🌻',
        '谢谢你认真看完～',
        '小葵感受到你的关心了！',
        '记得把环保带回生活哦',
        '再往下就没有啦，回去看看吧'
    ],

    init() {
        this.create();
        this.bindScroll();
    },

    create() {
        const egg = document.createElement('div');
        egg.className = 'scroll-bottom-egg';
        egg.innerHTML = `
            <div class="egg-bubble">
                <span class="egg-text">你已经看到底啦！🌻</span>
            </div>
            <div class="egg-sunflower">
                <svg viewBox="0 0 80 80" width="80" height="80">
                    <g transform="translate(40,40)">
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(0)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(45)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(90)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(135)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(180)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(225)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(270)"/>
                        <ellipse cx="0" cy="-22" rx="7" ry="18" fill="#F4C430" transform="rotate(315)"/>
                        <circle cx="0" cy="0" r="13" fill="#8B6914"/>
                        <circle cx="0" cy="0" r="10" fill="#6B4F0A"/>
                        <circle cx="-4" cy="-2" r="1.8" fill="#FFF"/>
                        <circle cx="4" cy="-2" r="1.8" fill="#FFF"/>
                        <circle cx="-4" cy="-2" r="1" fill="#3B210F"/>
                        <circle cx="4" cy="-2" r="1" fill="#3B210F"/>
                        <path d="M -4 4 Q 0 7 4 4" stroke="#3B210F" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                    </g>
                </svg>
            </div>
        `;
        document.body.appendChild(egg);
        this.el = egg;
    },

    bindScroll() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkBottom();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    },

    checkBottom() {
        const footer = document.querySelector('.footer');
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        // 页脚顶部还在视口下方时触发（内容看完但页脚未入视口）
        const isContentDone = footerRect.top > window.innerHeight && footerRect.top < window.innerHeight + 120;

        if (isContentDone && !this.isShown) {
            this.show();
        } else if (!isContentDone && this.isShown) {
            this.hide();
        }
    },

    show() {
        this.isShown = true;
        const text = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.el.querySelector('.egg-text').textContent = text;
        this.el.classList.add('visible');
    },

    hide() {
        this.isShown = false;
        this.el.classList.remove('visible');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ScrollBottomEgg.init();
});


