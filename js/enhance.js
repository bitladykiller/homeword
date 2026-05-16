/**
 * 前端展示优化 - 增强交互脚本
 */

const EnhanceUI = {
    init() {
        this.initReadingProgress();
        this.initHamburgerMenu();
        this.initPageTransition();
        this.initHeroPetals();
        this.initBreadcrumbBack();
    },

    /**
     * 阅读进度条
     */
    initReadingProgress() {
        const bar = document.createElement('div');
        bar.className = 'reading-progress';
        document.body.appendChild(bar);

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    bar.style.width = progress + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    },

    /**
     * 移动端汉堡菜单
     */
    initHamburgerMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        if (!navContainer || !navMenu) return;

        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', '菜单');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        navContainer.appendChild(toggle);

        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        const openMenu = () => {
            toggle.classList.add('active');
            navMenu.classList.add('open');
            overlay.classList.add('active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            toggle.classList.remove('active');
            navMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { overlay.style.display = 'none'; }, 300);
        };

        toggle.addEventListener('click', () => {
            navMenu.classList.contains('open') ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    },

    /**
     * 页面切换过渡动画 - 轻量奶油色淡入淡出
     */
    initPageTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('leaving');
                setTimeout(() => { window.location.href = href; }, 150);
            });
        });

        window.addEventListener('load', () => {
            overlay.classList.remove('leaving');
        });
    },

    /**
     * 首页 Hero 花瓣飘落动画
     */
    initHeroPetals() {
        const container = document.getElementById('heroPetals');
        if (!container) return;

        const petalColors = ['#F4C430', '#FFD700', '#E8D020', '#90C460', '#5A9A4A'];
        const petalCount = 12;

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'hero-petal';

            const size = 8 + Math.random() * 14;
            const left = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = 6 + Math.random() * 6;
            const color = petalColors[Math.floor(Math.random() * petalColors.length)];
            const drift = -30 + Math.random() * 60;

            petal.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size * 1.4}px;
                background: ${color};
                border-radius: 50% 50% 50% 0;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                --drift: ${drift}px;
            `;

            container.appendChild(petal);
        }
    },

    /**
     * 面包屑返回按钮
     */
    initBreadcrumbBack() {
        const breadcrumb = document.querySelector('.breadcrumb .container');
        if (!breadcrumb) return;

        // 查找面包屑中的上级链接（倒数第二个 a 标签）
        const links = breadcrumb.querySelectorAll('a');
        if (links.length === 0) return;

        // 取最后一个 a 作为返回目标
        const parentLink = links[links.length - 1];
        const parentTitle = parentLink.textContent;
        const parentHref = parentLink.getAttribute('href');

        const backBtn = document.createElement('a');
        backBtn.className = 'breadcrumb-back';
        backBtn.href = parentHref;
        backBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            返回${parentTitle}
        `;

        breadcrumb.insertBefore(backBtn, breadcrumb.firstChild);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    EnhanceUI.init();
});
