# 小葵的污染体检报告 - 图片资源清单

## 项目图片使用说明

本项目当前使用CSS绘制示意图。如需替换为真实图片，请参考 `image-prompts.md` 文件中的详细Prompt。

## 图片文件列表

### 核心图片（必须）
| 文件名 | 尺寸 | 用途 | 优先级 |
|--------|------|------|--------|
| hero-sunflower.png | 1200x675 | 首页主视觉 - 半健康半枯萎向日葵 | 高 |
| leaf-healthy.png | 600x600 | 健康叶片特写 | 高 |
| leaf-damaged.png | 600x600 | 受损叶片特写 | 高 |
| root-healthy.png | 600x800 | 健康根系示意图 | 高 |
| root-damaged.png | 600x800 | 受损根系示意图 | 高 |
| photosynthesis-diagram.png | 1000x600 | 光合作用过程图 | 高 |

### 场景图片（推荐）
| 文件名 | 尺寸 | 用途 | 优先级 |
|--------|------|------|--------|
| air-pollution-scene.png | 1200x675 | 空气污染场景 | 中 |
| water-pollution-scene.png | 1200x675 | 水体污染场景 | 中 |
| soil-pollution-scene.png | 1200x675 | 土壤污染场景 | 中 |
| xiaokui-avatar.png | 400x400 | 小葵吉祥物头像 | 中 |

### 植物图鉴（可选）
| 文件名 | 尺寸 | 用途 | 优先级 |
|--------|------|------|--------|
| plant-reed.png | 400x400 | 芦苇图鉴 | 低 |
| plant-sunflower.png | 400x400 | 向日葵图鉴 | 低 |
| plant-vetiver.png | 400x400 | 香根草图鉴 | 低 |
| plant-willow.png | 400x400 | 柳树图鉴 | 低 |

### 图标与装饰（可选）
| 文件名 | 尺寸 | 用途 | 优先级 |
|--------|------|------|--------|
| icon-air-control.png | 200x200 | 空气治理图标 | 低 |
| icon-water-control.png | 200x200 | 水体治理图标 | 低 |
| icon-soil-control.png | 200x200 | 土壤治理图标 | 低 |
| action-bg.png | 1200x675 | 个人行动页背景 | 低 |
| decoration-leaves.png | 400x200 | 装饰性叶子边框 | 低 |
| report-stamp.png | 200x200 | 体检报告印章 | 低 |

## 设计风格统一要求

### 整体风格
- **风格**: 扁平插画 + 微质感，科普绘本感
- **色调**: 主绿色(#2F6B4F)、向日葵黄(#F4C430)、米白(#F6F1E8)
- **背景**: 干净简洁，留白充足
- **比例**: 统一为16:9或1:1

### 配色方案
```
主绿色: #2F6B4F (植物、健康)
向日葵黄: #F4C430 (花朵、高亮)
污染灰: #3A3A3A (文字、污染)
米白背景: #F6F1E8 (背景)
警示橙红: #E85D3F (警告、受损)
清水蓝: #4FA3A5 (水、清新)
```

## 图片生成Prompt

详细的AI图片生成Prompt请查看同目录下的 `image-prompts.md` 文件。

## 图片来源建议

如需使用真实照片而非AI生成：
- Unsplash (https://unsplash.com) - 免费高质量图片
- Pexels (https://pexels.com) - 免费商用图片
- Pixabay (https://pixabay.com) - 免费图片素材
- 中国自然图片库 (https://www.naturephoto-cnt.com)

## 技术规范

1. **格式**: PNG（需要透明背景）或 JPG（不需要透明）
2. **大小**: 单张控制在200KB以内
3. **压缩**: 使用 tinypng.com 等工具优化
4. **命名**: 使用小写字母和连字符，如 `hero-sunflower.png`
5. **Alt文本**: 为每张图片添加描述性alt属性

## 使用方式

将图片放入本目录后，在HTML中引用：

```html
<img src="assets/images/hero-sunflower.png" alt="半健康半枯萎的向日葵小葵">
```

## 版权说明

- AI生成图片：确认使用的AI工具允许商业/教育用途
- 真实照片：确保符合版权要求或使用CC0许可图片
- 建议标注图片来源
