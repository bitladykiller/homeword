/**
 * 前端展示优化 - 增强交互脚本
 */

const EnhanceUI = {
    init() {
        this.initReadingProgress();
        this.initHamburgerMenu();
        this.initPageTransition();
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

        // 创建汉堡按钮
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', '菜单');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        navContainer.appendChild(toggle);

        // 创建遮罩
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
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);

        // 点击菜单链接后关闭
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

                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            });
        });

        window.addEventListener('load', () => {
            overlay.classList.remove('leaving');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    EnhanceUI.init();
});
