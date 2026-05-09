# 小葵的污染体检报告

以「向日葵小葵」为主角的环境科普静态网站。项目把空气、水体、土壤污染对植物的影响组织成一份可浏览、可交互的体检报告，帮助用户理解污染来源、植物受损机制和生态修复行动。

## 项目亮点

- **叙事清晰**：按「污染观察 -> 伤害诊断 -> 修复行动」组织内容，适合课程展示和科普讲解。
- **多页面展区**：首页连接三个展区，每个展区包含独立专题页面。
- **轻量实现**：纯 HTML、CSS、JavaScript，无后端服务和构建流程。
- **交互丰富**：包含观察点点击、步骤切换、标签页、卡片翻转、康复进度和承诺卡生成。
- **视觉统一**：以向日葵黄、生态绿、警示红为核心色，配合 SVG 和图片资源呈现植物体检主题。

## 页面结构

```text
sunflower-pollution-report/
├── index.html                         # 首页：体检摘要与展区入口
├── pollution-record.html              # 第一展区：污染环境记录
│   ├── air.html                       # 空气污染观察
│   ├── water.html                     # 水体污染观察
│   └── soil.html                      # 土壤污染观察
├── plant-damage.html                  # 第二展区：植物伤害观察
│   ├── leaf.html                      # 叶片损伤
│   ├── root.html                      # 根系损伤
│   └── photosynthesis.html            # 光合作用受损
├── repair.html                        # 第三展区：生态修复建议
│   ├── control.html                   # 污染源治理
│   ├── phytoremediation.html          # 植物修复
│   └── action.html                    # 个人行动与康复交互
├── css/style.css                      # 全站样式、响应式布局、动画效果
├── js/main.js                         # 页面交互逻辑
└── assets/images/                     # 图片资源与资源说明
```

## 核心交互

| 页面 | 交互内容 |
| --- | --- |
| `air.html` | 点击叶片观察点，查看叶尖焦枯、斑点、黄化、灰尘覆盖等现象 |
| `water.html` | 按步骤展示污染水从排放到植物吸收的路径 |
| `soil.html` | 点击土壤剖面，查看不同土层的污染分布 |
| `plant-damage.html` | 悬停或聚焦按钮，高亮对应体检报告项 |
| `leaf.html` | 切换健康叶片与污染叶片状态 |
| `root.html` | 点击根系观察点，查看地下损伤细节 |
| `control.html` | 在空气、水体、土壤治理方案之间切换 |
| `phytoremediation.html` | 翻转植物卡片，查看修复能力说明 |
| `action.html` | 勾选个人环保行动，驱动小葵康复进度、状态文字和承诺卡 |

## 技术栈

- HTML5：语义化页面结构
- CSS3：响应式布局、CSS 变量、动画、`conic-gradient`、SVG 状态样式
- JavaScript：原生 DOM 交互，无框架依赖
- SVG / PNG：角色插画、场景图、图标和可缩放视觉元素

## 快速开始

进入项目目录：

```bash
cd sunflower-pollution-report
```

直接打开 `index.html` 即可预览。为了避免部分浏览器在 `file://` 协议下限制资源加载，推荐使用本地静态服务器：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

也可以使用 Node 工具启动：

```bash
npx serve .
```

## 开发说明

- 修改页面内容：编辑对应的 `.html` 文件。
- 修改全站样式：编辑 `css/style.css`。
- 修改交互逻辑：编辑 `js/main.js`。
- 替换图片资源：将图片放入 `assets/images/`，并同步更新 HTML 中的 `src` 和 `alt`。
- 当前项目不需要打包构建，保存文件后刷新浏览器即可查看效果。

## 资源规范

图片资源建议遵循以下约定：

- 格式：PNG 用于透明背景，JPG 用于普通照片或场景图。
- 命名：使用小写英文和连字符，例如 `hero-sunflower.png`。
- 体积：单张图片尽量控制在 200KB 以内。
- 可访问性：所有图片应提供准确的 `alt` 文本。
- 版权：课程展示也应保留图片来源或确认素材授权。

更详细的图片清单见 `assets/images/README.md`。

## 浏览器支持

建议使用新版 Chrome、Edge、Safari 或 Firefox。项目使用了 `conic-gradient`、CSS 自定义属性、SVG 滤镜等现代浏览器特性，旧版浏览器可能出现样式降级。

## 使用场景

- 环境科学、生态保护相关课程作业
- 科普展示型网页
- HTML / CSS / JavaScript 多页面静态项目练习
- 交互式网页叙事案例

## 许可

仅供学习、课程展示和非商业交流使用。
