/**
 * 小葵的污染体检报告 - 交互脚本
 * 所有页面共享的交互功能
 */

/**
 * 动画工具模块 - 统一淡入淡出等常用动画
 */
const Anim = {
    /**
     * 淡出元素
     * @param {HTMLElement} el
     * @param {number} duration - 动画时长(ms)
     * @param {string} transform - 额外的过渡变形
     * @returns {Promise<void>}
     */
    fadeOut(el, duration, transform) {
        return new Promise(resolve => {
            if (transform) el.style.transform = transform;
            el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
            el.style.opacity = '0';
            setTimeout(() => {
                el.hidden = true;
                resolve();
            }, duration);
        });
    },

    /**
     * 淡入元素
     * @param {HTMLElement} el
     * @param {number} duration - 动画时长(ms)
     * @param {string} fromTransform - 起始变形
     * @param {string} toTransform - 结束变形
     * @returns {Promise<void>}
     */
    fadeIn(el, duration, fromTransform, toTransform) {
        return new Promise(resolve => {
            el.hidden = false;
            el.style.opacity = '0';
            el.style.transform = fromTransform || 'translateY(10px)';
            el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = toTransform || 'translateY(0)';
                    setTimeout(() => resolve(), duration);
                });
            });
        });
    },

    /**
     * 交叉淡入淡出：先隐藏旧元素，再显示新元素
     * @param {HTMLElement[]} hideEls - 要隐藏的元素
     * @param {HTMLElement} showEl - 要显示的元素
     * @param {number} duration - 动画时长(ms)
     * @returns {Promise<void>}
     */
    crossFade(hideEls, showEl, duration) {
        return Promise.all(hideEls.map(el => Anim.fadeOut(el, duration || 200)))
            .then(() => Anim.fadeIn(showEl, duration || 200));
    },

    /**
     * 批量淡出所有元素
     * @param {HTMLElement[]} els - 要隐藏的元素
     * @param {number} duration - 动画时长(ms)
     * @param {string} transform - 过渡变形
     * @returns {Promise<void>}
     */
    fadeOutAll(els, duration, transform) {
        return Promise.all(els.map(el => Anim.fadeOut(el, duration || 200, transform)));
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initScrollAnimations();
    initLazyLoadImages();
    initParallaxEffects();
    initLeafObservation();
    initWaterPath();
    initSoilLayers();
    initExamReport();
    initLeafComparison();
    initRootObservation();
    initPhotoReasons();
    initTabs();
    initPlantCards();
    initActionCard();
});

/**
 * 叶片观察点交互（air.html）
 * 点击观察点切换说明内容，支持平滑过渡
 */
function initLeafObservation() {
    const points = document.querySelectorAll('.observation-point');
    const infoPanel = document.getElementById('observationInfo');

    if (points.length === 0 || !infoPanel) return;

    points.forEach(point => {
        point.addEventListener('click', async function() {
            const target = this.dataset.point;

            points.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const defaultInfo = infoPanel.querySelector('.info-default');
            const allDetails = Array.from(infoPanel.querySelectorAll('.info-detail'));
            const targetDetail = infoPanel.querySelector(`[data-for="${target}"]`);

            const hideEls = [];
            if (defaultInfo && !defaultInfo.hidden) hideEls.push(defaultInfo);
            hideEls.push(...allDetails.filter(d => !d.hidden));

            if (hideEls.length > 0) {
                await Anim.fadeOutAll(hideEls, 200, 'translateX(10px)');
            }
            if (targetDetail) {
                await Anim.fadeIn(targetDetail, 200, 'translateX(10px)', 'translateX(0)');
            }
        });
    });
}

/**
 * 水体污染路径交互（water.html）
 * 点击步骤卡片显示对应解释，支持平滑过渡
 */
function initWaterPath() {
    const steps = document.querySelectorAll('.path-step');
    const detailPanel = document.getElementById('pathDetail');

    if (steps.length === 0 || !detailPanel) return;

    const stepDescriptions = {
        '1': '工业废水和生活污水未经处理直接排入河流，使河水受到污染，水质变黑发臭。',
        '2': '污染的河水被用于农业灌溉，通过水渠和管道进入农田灌溉系统。',
        '3': '污染水渗入土壤，使土壤中的有害物质含量增加，破坏土壤结构。',
        '4': '植物根系吸收被污染的水分和土壤中的有害物质，毒素在植物体内积累。',
        '5': '植物生长受到抑制，出现叶片发黄、根系腐烂、生长缓慢等症状。'
    };

    steps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = this.dataset.step;

            // 移除所有步骤的激活状态
            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');

            // 淡出旧内容
            detailPanel.style.opacity = '0';
            detailPanel.style.transform = 'translateY(10px)';

            setTimeout(() => {
                // 更新详情内容
                if (stepDescriptions[stepNum]) {
                    detailPanel.innerHTML = `
                        <div class="path-detail-content">
                            <strong>步骤 ${stepNum}：</strong>
                            <p>${stepDescriptions[stepNum]}</p>
                        </div>
                    `;
                }

                // 淡入新内容
                detailPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                detailPanel.style.opacity = '1';
                detailPanel.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

/**
 * 土壤剖面交互（soil.html）
 * 点击土层显示对应说明，支持平滑过渡
 */
function initSoilLayers() {
    const layers = document.querySelectorAll('.soil-layer-item');

    if (layers.length === 0) return;

    layers.forEach(layer => {
        layer.addEventListener('click', function() {
            // 移除所有图层的激活状态
            layers.forEach(l => {
                l.classList.remove('active');
                const defaultText = l.querySelector('.layer-default');
                const detailText = l.querySelector('.layer-detail');
                if (defaultText) {
                    defaultText.style.opacity = '1';
                    defaultText.hidden = false;
                }
                if (detailText) {
                    detailText.style.opacity = '0';
                    detailText.style.transform = 'translateY(5px)';
                    setTimeout(() => { detailText.hidden = true; }, 200);
                }
            });

            // 激活当前图层
            this.classList.add('active');
            const defaultText = this.querySelector('.layer-default');
            const detailText = this.querySelector('.layer-detail');

            if (defaultText) {
                defaultText.style.opacity = '0';
                setTimeout(() => { defaultText.hidden = true; }, 200);
            }

            if (detailText) {
                setTimeout(() => {
                    detailText.hidden = false;
                    detailText.style.opacity = '0';
                    detailText.style.transform = 'translateY(5px)';
                    detailText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                    requestAnimationFrame(() => {
                        detailText.style.opacity = '1';
                        detailText.style.transform = 'translateY(0)';
                    });
                }, 250);
            }
        });
    });
}

/**
 * 体检报告高亮交互（plant-damage.html）
 * 悬停在按钮上时高亮对应报告项，支持平滑过渡
 */
function initExamReport() {
    const buttons = document.querySelectorAll('.exam-btn');
    const reportItems = document.querySelectorAll('.report-item');

    if (buttons.length === 0 || reportItems.length === 0) return;

    buttons.forEach(btn => {
        const target = btn.dataset.target;

        btn.addEventListener('mouseenter', function() {
            reportItems.forEach(item => {
                if (item.dataset.item === target) {
                    item.classList.add('highlight');
                    item.style.transform = 'translateX(8px)';
                }
            });
        });

        btn.addEventListener('mouseleave', function() {
            reportItems.forEach(item => {
                item.classList.remove('highlight');
                item.style.transform = 'translateX(0)';
            });
        });

        // 添加焦点支持（键盘导航）
        btn.addEventListener('focus', function() {
            reportItems.forEach(item => {
                if (item.dataset.item === target) {
                    item.classList.add('highlight');
                    item.style.transform = 'translateX(8px)';
                }
            });
        });

        btn.addEventListener('blur', function() {
            reportItems.forEach(item => {
                item.classList.remove('highlight');
                item.style.transform = 'translateX(0)';
            });
        });
    });
}

/**
 * 叶片状态对比交互（leaf.html）
 * 点击按钮切换健康/污染状态，支持平滑过渡
 */
function initLeafComparison() {
    const buttons = document.querySelectorAll('.compare-btn');
    const leafDisplay = document.getElementById('leafDisplay');

    if (buttons.length === 0 || !leafDisplay) return;

    const leafData = {
        healthy: {
            title: '健康叶片',
            desc: '叶片翠绿，叶脉清晰，表面光滑，没有斑点或损伤。',
            className: 'healthy-state',
            image: 'assets/images/leaf-healthy.png',
            alt: '健康叶片'
        },
        polluted: {
            title: '污染叶片',
            desc: '叶片黄化，出现斑点，叶缘焦枯，表面有灰尘覆盖。',
            className: 'polluted-state',
            image: 'assets/images/leaf-damaged.png',
            alt: '污染叶片'
        }
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const state = this.dataset.state;

            // 更新按钮状态
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 添加过渡动画
            const visual = leafDisplay.querySelector('.leaf-visual');
            const image = document.getElementById('leafImage');
            const title = document.getElementById('leafTitle');
            const desc = document.getElementById('leafDesc');

            // 淡出
            if (visual) {
                visual.style.opacity = '0';
                visual.style.transform = 'scale(0.95)';
            }
            if (title) title.style.opacity = '0';
            if (desc) desc.style.opacity = '0';

            // 延迟后更新内容并淡入
            setTimeout(() => {
                if (visual && leafData[state]) {
                    visual.classList.remove('healthy-state', 'polluted-state');
                    visual.classList.add(leafData[state].className);
                }

                if (image && leafData[state]) {
                    image.src = leafData[state].image;
                    image.alt = leafData[state].alt;
                }

                if (title && leafData[state]) {
                    title.textContent = leafData[state].title;
                }

                if (desc && leafData[state]) {
                    desc.textContent = leafData[state].desc;
                }

                // 淡入
                if (visual) {
                    visual.style.opacity = '1';
                    visual.style.transform = 'scale(1)';
                }
                if (title) title.style.opacity = '1';
                if (desc) desc.style.opacity = '1';
            }, 200);
        });
    });
}

/**
 * 根系观察点交互（root.html）
 * 点击观察点显示对应说明，支持平滑过渡
 */
function initRootObservation() {
    const points = document.querySelectorAll('.root-point');
    const infoPanel = document.getElementById('rootInfoPanel');

    if (points.length === 0 || !infoPanel) return;

    points.forEach(point => {
        point.addEventListener('click', async function() {
            const target = this.dataset.point;

            points.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const defaultInfo = infoPanel.querySelector('.root-info-default');
            const allDetails = Array.from(infoPanel.querySelectorAll('.root-info-detail'));
            const targetDetail = infoPanel.querySelector(`[data-for="${target}"]`);

            const hideEls = [];
            if (defaultInfo && !defaultInfo.hidden) hideEls.push(defaultInfo);
            hideEls.push(...allDetails.filter(d => !d.hidden));

            if (hideEls.length > 0) {
                await Anim.fadeOutAll(hideEls, 200);
            }
            if (targetDetail) {
                await Anim.fadeIn(targetDetail, 200, 'translateX(10px)', 'translateX(0)');
            }
        });
    });
}

/**
 * 光合作用原因展开交互（photosynthesis.html）
 * 点击按钮展开/收起原因卡片，支持平滑高度动画
 */
function initPhotoReasons() {
    const toggleBtn = document.getElementById('toggleReasons');
    const reasonsGrid = document.getElementById('reasonsGrid');

    if (!toggleBtn || !reasonsGrid) return;

    // 设置初始状态
    let isExpanded = !reasonsGrid.hidden;

    toggleBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;

        if (isExpanded) {
            // 展开
            reasonsGrid.hidden = false;
            reasonsGrid.style.opacity = '0';
            reasonsGrid.style.transform = 'translateY(-10px)';

            requestAnimationFrame(() => {
                reasonsGrid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                reasonsGrid.style.opacity = '1';
                reasonsGrid.style.transform = 'translateY(0)';
            });

            this.textContent = '收起原因';
            this.setAttribute('aria-expanded', 'true');
        } else {
            // 收起
            reasonsGrid.style.opacity = '0';
            reasonsGrid.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                reasonsGrid.hidden = true;
            }, 300);

            this.textContent = '查看原因';
            this.setAttribute('aria-expanded', 'false');
        }
    });

    // 设置 ARIA 属性
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    toggleBtn.setAttribute('aria-controls', 'reasonsGrid');
}

/**
 * 标签页切换交互（control.html）
 * 点击标签切换内容面板，支持平滑过渡
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0 || tabPanels.length === 0) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // 更新按钮状态
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // 切换面板，带过渡动画
            tabPanels.forEach(panel => {
                if (panel.dataset.panel === targetTab) {
                    panel.hidden = false;
                    panel.classList.add('active');

                    // 淡入动画
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(10px)';

                    requestAnimationFrame(() => {
                        panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        panel.style.opacity = '1';
                        panel.style.transform = 'translateY(0)';
                    });
                } else {
                    panel.classList.remove('active');
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(-10px)';

                    setTimeout(() => {
                        panel.hidden = true;
                    }, 200);
                }
            });
        });
    });

    // 初始化 ARIA 属性
    tabButtons.forEach(btn => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
    });

    tabPanels.forEach(panel => {
        panel.setAttribute('role', 'tabpanel');
    });
}

/**
 * 植物修复图鉴卡片翻转（phytoremediation.html）
 * 点击卡片翻转显示背面信息，支持键盘操作
 */
function initPlantCards() {
    const cards = document.querySelectorAll('.plant-card');

    cards.forEach(card => {
        // 点击翻转
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        // 键盘支持（Enter/Space）
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });

        // 添加 tabindex 使其可聚焦
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');

        // 监听翻转状态更新 aria-pressed
        card.addEventListener('click', function() {
            const isFlipped = this.classList.contains('flipped');
            this.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
        });
    });
}

/**
 * 小葵康复系统 + 个人行动卡生成交互（action.html）
 * 勾选行动实时改变小葵状态，生成行动卡
 */
function initActionCard() {
    const form = document.getElementById('actionForm');
    const resultPanel = document.getElementById('actionCardResult');
    const hintPanel = document.getElementById('actionHint');
    const actionsList = document.getElementById('cardActions');
    const container = document.getElementById('actionContainer');

    if (!form) return;

    // ===== 康复系统：监听 checkbox 变化，更新 data-healed 属性 =====
    const checkboxes = form.querySelectorAll('input[name="action"]');
    const totalActions = checkboxes.length || 6;
    const healingPercent = document.getElementById('healingPercent');
    const healingRing = document.getElementById('healingRing');
    const leafStatus = document.getElementById('leafStatus');
    const rootStatus = document.getElementById('rootStatus');
    const photoStatus = document.getElementById('photoStatus');
    const healingMessage = document.getElementById('healingMessage');

    const healingMessages = [
        '选择你的行动，帮助小葵恢复健康...',
        '小葵感受到了你的关心，继续加油！',
        '小葵的叶片开始有了光泽...',
        '小葵的根系正在恢复活力！',
        '小葵的光合作用效率在提升！',
        '小葵几乎完全康复了，再选一项吧！',
        '太棒了！小葵完全康复了！'
    ];

    function updateHealingState() {
        const checkedCount = form.querySelectorAll('input[name="action"]:checked').length;

        // 在容器上设置 data-healed，让 CSS 兄弟选择器能匹配到
        if (container) {
            container.setAttribute('data-healed', checkedCount.toString());
        }

        // 更新百分比和进度环角度，避免文字与圆环显示不同步。
        const percent = Math.round((checkedCount / totalActions) * 100);
        if (healingPercent) {
            healingPercent.textContent = percent + '%';
        }
        if (healingRing) {
            const progressDeg = checkedCount === totalActions ? 360 : (checkedCount / totalActions) * 360;
            healingRing.style.setProperty('--ring-progress', progressDeg + 'deg');
            healingRing.setAttribute('aria-valuenow', percent.toString());
        }

        // 分析选中的康复类型（用父元素遍历，避免 :has 兼容性问题）
        const checkedInputs = form.querySelectorAll('input[name="action"]:checked');
        let hasLeafHeal = false, hasRootHeal = false, hasPhotoHeal = false;

        checkedInputs.forEach(input => {
            const optionLabel = input.closest('.action-option');
            if (optionLabel) {
                const healType = optionLabel.dataset.heal;
                if (healType === 'leaf') hasLeafHeal = true;
                if (healType === 'root') hasRootHeal = true;
                if (healType === 'photo') hasPhotoHeal = true;
            }
        });

        // 更新状态文字
        if (leafStatus) {
            if (checkedCount >= 5) leafStatus.textContent = '健康';
            else if (hasLeafHeal) leafStatus.textContent = '好转中';
            else leafStatus.textContent = '受损';
        }
        if (rootStatus) {
            if (checkedCount >= 5) rootStatus.textContent = '健康';
            else if (hasRootHeal) rootStatus.textContent = '恢复中';
            else rootStatus.textContent = '异常';
        }
        if (photoStatus) {
            if (checkedCount >= 5) photoStatus.textContent = '正常';
            else if (hasPhotoHeal) photoStatus.textContent = '回升中';
            else photoStatus.textContent = '下降';
        }

        // 更新提示语
        if (healingMessage) {
            healingMessage.textContent = healingMessages[checkedCount] || healingMessages[0];
        }
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateHealingState);
    });

    // 初始化状态
    updateHealingState();

    // ===== 生成行动卡 =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取选中的行动
        const checkedActions = form.querySelectorAll('input[name="action"]:checked');
        const selectedValues = Array.from(checkedActions).map(cb => cb.value);

        // 隐藏之前的提示
        if (hintPanel) hintPanel.hidden = true;

        // 检查是否至少选择了一项
        if (selectedValues.length === 0) {
            if (hintPanel) hintPanel.hidden = false;
            if (resultPanel) resultPanel.hidden = true;
            if (container) container.classList.remove('action-card-generated');
            return;
        }

        // 生成行动卡，逐项动画
        if (actionsList) {
            actionsList.innerHTML = '';
            selectedValues.forEach((action, index) => {
                const li = document.createElement('li');
                li.textContent = action;
                li.style.opacity = '0';
                li.style.transform = 'translateX(-10px)';
                li.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
                actionsList.appendChild(li);

                // 触发动画
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        li.style.opacity = '1';
                        li.style.transform = 'translateX(0)';
                    });
                });
            });
        }

        // 显示结果，带淡入动画
        if (resultPanel) {
            resultPanel.hidden = false;
            resultPanel.style.opacity = '0';
            resultPanel.style.transform = 'translateY(20px) scale(0.98)';

            requestAnimationFrame(() => {
                resultPanel.style.transition = 'opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo)';
                resultPanel.style.opacity = '1';
                resultPanel.style.transform = 'translateY(0) scale(1)';
            });
        }

        if (container) {
            container.classList.remove('action-card-generated');
            void container.offsetWidth;
            container.classList.add('action-card-generated');
            window.setTimeout(() => {
                container.classList.remove('action-card-generated');
            }, 1100);
        }

        // 滚动到结果
        setTimeout(() => {
            resultPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });
}

/**
 * 平滑滚动到锚点 - 增强版
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            // 考虑固定导航栏高度的偏移
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * 导航栏当前页面高亮
 */
(function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
})();

/**
 * 滚动触发动画 - Intersection Observer
 * 为带有 .animate-on-scroll 类的元素添加入场动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.summary-card, .exhibition-card, .symptom-card, .info-card, ' +
        '.pollution-card, .repair-card, .plant-card, .reason-card, ' +
        '.damage-item, .impact-step, .measure-item, .action-option'
    );

    if (animatedElements.length === 0) return;

    // 为每个元素添加初始状态类，根据位置应用不同动画
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.05}s`;

        // 根据元素类型添加不同的入场动画变体
        if (el.classList.contains('info-card') || el.classList.contains('symptom-card')) {
            el.classList.add('scale-in');
        } else if (el.classList.contains('damage-item') || el.classList.contains('measure-item')) {
            el.classList.add('fade-in-left');
        } else if (el.classList.contains('reason-card')) {
            el.classList.add('blur-in');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // 动画触发后取消观察，避免重复触发
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * 图片懒加载
 * 为带有 loading="lazy" 的图片添加加载完成动画
 */
function initLazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * 视差滚动效果 - 增强版
 * 为 hero 区域和装饰元素添加视差效果
 */
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    const detailHeader = document.querySelector('.detail-header');

    if (!heroSection && !detailHeader) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Hero 图片视差
                if (heroImage) {
                    const rate = scrolled * 0.3;
                    heroImage.style.transform = `translateY(${rate}px)`;
                }

                // 详情页头部 - 仅做微弱视差，避免内容偏移过大
                if (detailHeader) {
                    const headerRate = scrolled * 0.05;
                    detailHeader.style.transform = `translateY(${headerRate}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * 导航栏滚动效果 - 增强版
 * 滚动时添加阴影、背景变化和智能显隐
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // 添加/移除滚动样式
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // 向下滚动超过200px时隐藏导航栏，向上滚动时显示
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 鼠标移动到顶部时显示导航栏
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 60) {
            navbar.style.transform = 'translateY(0)';
        }
    });

    // 回到顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '&uarr;';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', '回到顶部');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });
}
