# 小葵的污染体检报告 - 新增图片生成 Prompt 清单

## 设计风格统一要求
- 整体风格：扁平插画 + 微质感，科普绘本感
- 色调：以主绿色(#2F6B4F)、向日葵黄(#F4C430)、米白(#F6F1E8)为主
- 背景：干净简洁，留白充足
- 所有图片统一为 16:9 或 1:1 比例，PNG透明背景或浅色背景

---

## 一、首页体检摘要图标（替换 index.html emoji）

### 1. 生命状态图标 (icon-status-life.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换 index.html "生命状态" 卡片的 🌻
**Prompt**:
```
A cute sunflower character with a worried expression, slightly wilted petals, holding a medical clipboard, flat vector illustration style, #F4C430 yellow petals, #2F6B4F green stem, medical cross symbol on clipboard, transparent background, app icon aesthetic, kawaii style
```

### 2. 叶片状态图标 (icon-status-leaf.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换 index.html "叶片状态" 卡片的 🍃
**Prompt**:
```
A sunflower leaf with yellow spots and slight browning at edges, showing pollution damage, flat vector illustration style, transitioning from #2F6B4F green to #8B9A3A yellow-green, visible brown necrotic spots, transparent background, botanical icon style, educational diagram aesthetic
```

### 3. 根系状态图标 (icon-status-root.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换 index.html "根系状态" 卡片的 🌱
**Prompt**:
```
A plant root system partially visible in soil cross-section, some roots darkened and damaged, flat vector illustration style, cream and light brown healthy roots mixed with #6B5344 dark damaged roots, small soil particles, transparent background, botanical educational icon
```

### 4. 光合状态图标 (icon-status-photo.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换 index.html "光合状态" 卡片的 ☀️
**Prompt**:
```
A sun with rays shining on a small plant, but some rays are blocked by gray smog clouds, representing reduced photosynthesis, flat vector illustration style, #F4C430 yellow sun, #2F6B4F green plant, gray smog clouds, transparent background, environmental science icon, educational style
```

### 5. 污染原因图标 (icon-status-pollution.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换 index.html "主要疑似原因" 卡片的 ⚠️
**Prompt**:
```
A warning triangle with pollution symbols inside: factory smoke, dirty water drop, and contaminated soil, flat vector illustration style, #E85D3F red alert color, #2F6B4F green accents, transparent background, environmental warning icon, infographic style
```

---

## 二、植物伤害观察页（plant-damage.html）

### 6. 体检室向日葵角色 (exam-sunflower.png)
**尺寸**: 400x500 (4:5) | **背景**: 透明
**用途**: 替换体检室中CSS绘制的向日葵示意图
**Prompt**:
```
A full-body cute sunflower character standing for medical examination, wearing a simple white doctor's examination gown, looking slightly worried but cooperative, big expressive eyes, small green leaves as arms, flat vector illustration style, #F4C430 yellow petals, #2F6B4F green stem and leaves, transparent background, children's book illustration, kawaii aesthetic
```

---

## 三、叶片损伤页（leaf.html）

### 7. 症状图标-叶片发黄 (symptom-yellowing.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换症状卡片中的CSS色块 .symptom-visual.yellowing
**Prompt**:
```
A close-up of a yellowing leaf with chlorosis, pale green to yellow gradient, visible veins darker than leaf blade, flat vector illustration style, #8B9A3A to #B5A642 color transition, transparent background, botanical damage illustration, educational diagram style
```

### 8. 症状图标-叶缘焦枯 (symptom-scorch.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换症状卡片中的CSS色块 .symptom-visual.scorch
**Prompt**:
```
A leaf with brown scorched and dried edges, curled and crispy margins, healthy green center transitioning to brown burned edges, flat vector illustration style, #2F6B4F green center to #8B6914 brown edges, transparent background, botanical damage illustration, educational style
```

### 9. 症状图标-叶面斑点 (symptom-spots.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换症状卡片中的CSS色块 .symptom-visual.spots
**Prompt**:
```
A green leaf with multiple brown and black necrotic spots scattered across surface, ozone damage pattern, flat vector illustration style, #2F6B4F green leaf base, #6B5344 and #8B6914 brown spots, transparent background, botanical damage illustration, educational diagram
```

### 10. 症状图标-叶片卷曲 (symptom-curl.png)
**尺寸**: 200x200 (1:1) | **背景**: 透明
**用途**: 替换症状卡片中的CSS色块 .symptom-visual.curl
**Prompt**:
```
A curled and wilted leaf, edges rolled inward, drooping and limp appearance, showing water stress, flat vector illustration style, #8B9A3A dull green, curled shape, transparent background, botanical damage illustration, educational style
```

---

## 四、根系损伤页（root.html）

### 11. 地下透视图 (underground-diagram.png)
**尺寸**: 600x400 (3:2) | **背景**: 透明或浅棕色
**用途**: 替换地下透视图中的CSS绘制土壤盒和根系
**Prompt**:
```
Cross-section view of soil with plant roots, showing above-ground sunflower stem and below-ground root system in soil layers, some roots healthy white, others dark and rotting, soil layers in brown tones, flat educational illustration style, #2F6B4F green stem, cream and #6B5344 roots, brown soil layers, transparent background, science diagram aesthetic
```

---

## 五、光合作用页（photosynthesis.html）

### 12. 健康能量装饰图 (energy-healthy.png)
**尺寸**: 400x200 (2:1) | **背景**: 透明
**用途**: 能量条旁装饰 - 健康环境90%
**Prompt**:
```
A vibrant sunflower with bright yellow petals, standing tall and healthy, surrounded by glowing light particles, representing 90% photosynthesis energy, flat vector illustration style, #F4C430 bright yellow, #2F6B4F green, glowing light effects, transparent background, cheerful and energetic
```

### 13. 污染能量装饰图 (energy-polluted.png)
**尺寸**: 400x200 (2:1) | **背景**: 透明
**用途**: 能量条旁装饰 - 污染环境35%
**Prompt**:
```
A wilted small sunflower with drooping yellow-brown petals, dim and weak appearance, surrounded by gray smog particles, representing 35% photosynthesis energy, flat vector illustration style, #B5A642 dull yellow, #8B9A3A green, gray smog, transparent background, sad and weakened
```

---

## 六、空气污染详情页（air.html）

### 14. 叶片观察示意图 (leaf-observation.png)
**尺寸**: 400x600 (2:3) | **背景**: 透明
**用途**: 替换叶片观察区域中的CSS绘制叶片
**Prompt**:
```
A large sunflower leaf with four numbered observation points marked with red circles, showing different pollution damage types: tip scorch, brown spots, yellowing, and dust coverage, flat educational illustration style, #2F6B4F green base with damage areas, red numbered circles 1-4, transparent background, infographic diagram style
```

---

## 七、水体污染详情页（water.html）

### 15. 污染路径流程图 (water-path-diagram.png)
**尺寸**: 800x300 (8:3) | **背景**: 透明或浅蓝
**用途**: 替换污染路径步骤之间的箭头装饰
**Prompt**:
```
A horizontal infographic showing water pollution path: polluted river → irrigation pipe → soil seepage → root absorption → wilted plant, five connected steps with arrows, flat vector illustration style, #4FA3A5 blue water, #6B5344 brown soil, #2F6B4F green plant, #E85D3F red pollution indicators, transparent background, educational flowchart style
```

---

## 八、土壤污染详情页（soil.html）

### 16. 土壤剖面示意图 (soil-layers-diagram.png)
**尺寸**: 400x500 (4:5) | **背景**: 透明
**用途**: 替换土壤剖面观察中的CSS色块土层
**Prompt**:
```
Soil profile cross-section diagram showing four distinct layers: surface litter layer (0-10cm), root zone with visible roots (10-30cm), dark contaminated pollution layer with chemical symbols (30-50cm), and groundwater layer (50cm+), flat educational illustration style, brown earth tones, #2F6B4F green roots, dark #4A3728 pollution layer, #4FA3A5 blue groundwater, transparent background, science diagram aesthetic
```

---

## 九、修复页面（repair.html）

### 17. 污染源治理图标 (repair-control.png)
**尺寸**: 300x300 (1:1) | **背景**: 透明
**用途**: 替换 "污染源治理" 卡片的 🛠️
**Prompt**:
```
A factory with green filter/purification system on chimney, clean air coming out, gear and wrench maintenance symbols, environmental engineering concept, flat vector illustration style, #2F6B4F green, #4FA3A5 blue clean air, gray factory, transparent background, environmental technology icon
```

### 18. 植物修复图标 (repair-phytoremediation.png)
**尺寸**: 300x300 (1:1) | **背景**: 透明
**用途**: 替换 "植物修复" 卡片的 🌱
**Prompt**:
```
Multiple plants with visible roots absorbing pollutants from soil, showing phytoremediation process, sunflower and reed plants, roots extracting heavy metals, flat vector illustration style, #2F6B4F green plants, #F4C430 yellow sunflower, brown roots with pollutant particles, transparent background, environmental science icon
```

### 19. 个人行动图标 (repair-action.png)
**尺寸**: 300x300 (1:1) | **背景**: 透明
**用途**: 替换 "个人行动" 卡片的 🖐️
**Prompt**:
```
A human hand holding a small green seedling with heart symbol, representing personal environmental action and care, recycling symbol in background, flat vector illustration style, #2F6B4F green plant, skin-tone hand, #E85D3F red heart, #4FA3A5 blue recycling symbol, transparent background, environmental activism icon
```

---

## 十、已存在但需整合使用的图片

### 20. 个人行动背景 (action-bg.png)
**状态**: ✅ 已存在于 assets/images/
**用途**: action.html 页面背景或行动卡背景
**整合建议**: 在 action-section 或 action-card 添加背景图引用

### 21. 页面装饰叶子边框 (decoration-leaves.png)
**状态**: ✅ 已存在于 assets/images/
**用途**: 页面角落装饰，footer上方或section分隔处
**整合建议**: 在 index.html 或各页面 section 之间添加装饰性叶子元素

### 22. 体检报告印章 (report-stamp.png)
**状态**: ✅ 已存在于 assets/images/
**用途**: plant-damage.html 体检报告印章装饰
**整合建议**: 在 exam-report 区域添加印章图片

---

## 新增图片使用优先级建议

### 🔴 优先级：高（核心视觉提升）
| 图片 | 页面 | 影响 |
|------|------|------|
| exam-sunflower.png | plant-damage.html | 体检室主视觉，大幅提升第二展区品质 |
| leaf-observation.png | air.html | 空气污染页交互核心 |
| underground-diagram.png | root.html | 根系页核心图示 |
| soil-layers-diagram.png | soil.html | 土壤页核心图示 |

### 🟡 优先级：中（细节品质提升）
| 图片 | 页面 | 数量 |
|------|------|------|
| icon-status-*.png | index.html | 5张，统一首页摘要卡片风格 |
| symptom-*.png | leaf.html | 4张，症状卡片视觉 |
| repair-*.png | repair.html | 3张，修复页面卡片图标 |
| water-path-diagram.png | water.html | 1张，水体污染流程图 |

### 🟢 优先级：低（锦上添花）
| 图片 | 页面 | 说明 |
|------|------|------|
| energy-healthy/polluted.png | photosynthesis.html | 能量条旁装饰 |
| action-bg.png | action.html | 已存在，需整合 |
| decoration-leaves.png | 全站 | 已存在，需整合 |
| report-stamp.png | plant-damage.html | 已存在，需整合 |

---

## 生成后整合实施建议

1. **先完成高优先级图片**的生成和替换
2. **中优先级图片**可以分批完成
3. **已存在但未使用的图片**（action-bg, decoration-leaves, report-stamp）需要补充HTML引用
4. 所有替换时**保留原有CSS类作为fallback**，确保图片加载失败时仍有基本样式
5. 在CSS中添加对应的 `.icon-image`、`.symptom-image` 等样式类统一控制尺寸
