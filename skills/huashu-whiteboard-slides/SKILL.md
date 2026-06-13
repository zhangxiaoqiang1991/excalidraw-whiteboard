---
name: huashu-whiteboard-slides
description: 强哥风格的白板幻灯片生成器。手写Excalifont字体、黑白红三色、手绘粗糙感、3:4竖版、教学白板风。用于知识口播视频的配图、录屏展示、小红书/抖音内容素材。
metadata:
  version: 1.0.0
  author: qiangge
  style: handdrawn-teaching-whiteboard
---

# 强哥白板幻灯片（huashu-whiteboard-slides）

Generate a series of whiteboard-style slides in qiangge's signature style: hand-drawn Excalifont, black-white-red palette, rough sketch feel, 3:4 vertical format, teaching whiteboard aesthetic.

Perfect for knowledge-sharing talking-head videos, screen-record explainers, and Xiaohongshu/Douyin content.

## 重要前提：先磨脚本，再出白板

**这个 Skill 是视觉输出工具，不是内容创作工具。**

正确的使用顺序：
1. **先把口播脚本磨好** — 用 DBS 内容诊断、对标爆款脚本、AI 反复润色，直到脚本结构稳了、表达口语化了、认知落差立住了
2. **再用这个 Skill 出白板** — 把打磨好的脚本拆成 5-7 个知识点，每一页对应一个知识点，生成白板图

**原材料（脚本）没准备好之前，不要调用这个 Skill。** 没有好的脚本，白板做得再漂亮也是空壳。

> 参考来源：本 Skill 吸收了 [`Agents365-ai/excalidraw-skill`](https://github.com/Agents365-ai/excalidraw-skill) 的 Excalidraw JSON 生成规范（字段规则、元素类型、间距系统），但视觉风格完全独立——该 skill 默认干净整洁风，而本 skill 是强哥专属的手写教学白板风格。

---

## 视觉规范

### 色彩系统（只有三色）

| 用途 | 色值 | 示例 |
|------|------|------|
| 正文/边框 | `#1e1e1e` | 黑色手写体，手绘框 |
| 强调/关键结论 | `#e03131` | 红色框、红色波浪下划线、红色大叉 |
| 辅助/注释 | `#868e96` | 次要说明、分割线 |
| 背景 | 透明（纯白底） | `appState.viewBackgroundColor: "#ffffff"` |

**规则：不使用任何填充色。** 所有 `backgroundColor: "transparent"`。手绘框、箭头、线条全部用描边呈现，不做色块填充。

### 字体系统

| 层级 | 字号 | fontFamily | 用途 |
|------|------|-----------|------|
| 主标题 | 30-34px | `5` (Excalifont) | 居中 + 手绘下划线 |
| 段落标题 | 24-28px | `5` (Excalifont) | 章节名、关键结论 |
| 正文 | 20-22px | `5` (Excalifont) | 主要内容 |
| 辅助说明 | 18-19px | `5` (Excalifont) | 案例细节、补充信息 |
| 小字注释 | 14-16px | `5` (Excalifont) | 极少使用，仅在需要时 |

**CJK 文本宽度公式：** `width = Math.max(160, text.length * 20)`
**行高：** `lineHeight: 1.35`
**文本对齐：** 标题 `"center"`，正文 `"left"`，框内 `"center"`

### 元素样式

| 元素 | 样式 |
|------|------|
| 矩形框 | `roughness: 2`, `strokeWidth: 2`, `roundness: { type: 3 }` |
| 强调框 | `roughness: 2`, `strokeWidth: 3`, `strokeColor: "#e03131"` |
| 箭头 | `roughness: 2`, `strokeWidth: 2`, `endArrowhead: "arrow"` |
| 分割线 | `roughness: 3`, `strokeWidth: 1`, `strokeColor: "#868e96"` |
| 波浪下划线 | `roughness: 3`, `strokeWidth: 3`, `strokeColor: "#e03131"` |
| 大叉 | `roughness: 2`, `strokeWidth: 4-5`, `strokeColor: "#e03131"` |

### 布局规范（3:4 竖版）

- **画布宽度：** 480-500px
- **画布高度：** 560-600px（3:4 比例）
- **标题：** 居中，离顶部 20px，下方 48px 处画下划线
- **正文：** 左对齐，左侧边距 50-55px
- **框间距：** 纵向 12-15px，横向 10-15px
- **行距：** 宽松（lineHeight: 1.35）
- **组间距：** 纵向 40-60px
- **底部留白：** 至少 20px

### 页面信息密度

- **每页不超过 15-20 个元素**（元素 = 矩形 + 文字 + 箭头 + 线条合并计算）
- **每页不超过 4-5 个核心信息点**
- 如果信息太多，拆分到下一页

### 箭头使用规范（左侧概念→右侧解释）

```
[概念框]  ——箭头—→  [解释文字]
```

箭头指向用于：
- 阶段变化（A → B → C）
- 概念引出结论
- 并列对比

---

## 生成流程

### Step 1：理解内容

用户提供脚本或内容大纲。拆解为 5-7 个知识点，每个知识点对应一张幻灯片。

典型幻灯片结构：

| 页码 | 内容 |
|------|------|
| 01 | **推翻旧认知** — 指出常见误区 |
| 02 | **建立新概念** — 给出核心概念 |
| 03 | **筛选标准** — 怎么判断 |
| 04 | **案例拆解** — 真实案例对比 |
| 05 | **行动指南** — 怎么做 |
| 06 | **最后一刀** — 反常识洞察 |
| 07 | **收网转化** — CTA |

### Step 2：选择输出方式

本 Skill 提供两种输出方式：

**方式 A：直接生成 .excalidraw JSON（推荐）**

用脚本按每页的视觉规范生成 json 文件。每页单独一个 `.excalidraw` 文件，最后合并为一个白板文件。

**方式 B：参考 Agents365 excalidraw-skill**

如果遇到复杂布局（架构图、流程图、时序图），可以借助该 skill 的布局规则（间距、箭头路由、分组），但要将其视觉风格覆盖为本 skill 的规范（roughness: 2, fontFamily: 5, 黑白红色）。

### Step 3：生成单页

每页按以下结构生成：

```javascript
// 典型单页结构
const els = [];
// 1. 标题 + 下划线
els.push(text("title", "标题文字", 50, 20, 420, { sz: 34, al: "center" }));
els.push(line("line1", 80, 68, 440, 68, { sw: 2 }));

// 2. 内容框 + 文字（多个）
els.push(box("box1", 40, 105, 440, 52));
els.push(text("txt1", "内容文字", 55, 117, 410, { sz: 24 }));

// 3. 箭头连接
els.push(arr("arr1", 260, 200, 260, 235));

// 4. 关键结论（红色框）
els.push(box("concl", 50, 420, 420, 60, { c: "#e03131", sw: 3 }));
els.push(text("concl_txt", "关键结论", 70, 436, 380, { sz: 28, c: "#e03131", al: "center" }));

// 5. 红色波浪下划线
els.push(wavy("wave1", 190, 500, 140));
```

### Step 4：合并为白板

所有单页按纵向排列合并为一个白板文件：

- 每页宽度：500px
- 每页高度：580px
- 页间距：250px（录屏时一次只看到一张，推荐 200-300px）

偏移公式：`offsetY = pageIndex * (580 + 250)`

合并后的白板文件可以直接在 excalidraw.com 打开，滚动录屏。

### Step 5：交付

交付 `.excalidraw` 文件到桌面，告知用户用 excalidraw.com 打开即可编辑。

---

## Excalidraw JSON 字段规范

### 文件骨架

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [],
  "appState": { "viewBackgroundColor": "#ffffff" }
}
```

### 可用元素类型

| type | 用途 |
|------|------|
| `rectangle` | 框、卡片 |
| `arrow` | 有向箭头 |
| `line` | 直线、分割线、波浪线、大叉 |
| `text` | 文字 |

不要使用：`ellipse`, `diamond`, `image`, `frame`, `embeddable`

### 元素公共字段

| 字段 | 规则 |
|------|------|
| `id` | 描述性字符串（如 `"title_01"`, `"box_cost"`） |
| `seed` | 正整数，每元素唯一 |
| `boundElements` | 无绑定时为 `null`，不要用 `[]` |
| `updated` | 始终为 `1` |
| `roundness` | 矩形用 `{ type: 3 }`，箭头用 `{ type: 2 }`，线条用 `{ type: 2 }` |
| `fillStyle` | `"solid"` |
| `strokeStyle` | `"solid"` |

### 箭头绑定

箭头的 `points` 始终以 `[0, 0]` 起始。箭头不绑定到元素（跨页合并时绑定会损坏）。

```json
{
  "id": "arr1",
  "type": "arrow",
  "x": 260, "y": 200,
  "width": 0, "height": 35,
  "points": [[0, 0], [0, 35]],
  "startBinding": null,
  "endBinding": null,
  "startArrowhead": null,
  "endArrowhead": "arrow",
  "strokeColor": "#1e1e1e",
  "strokeWidth": 2,
  "roughness": 2
}
```

### 文字与容器的关系

文字在框内时，设置 `containerId` 指向框的 id，并设置 `verticalAlign: "middle"` 和 `textAlign: "center"`。

文字独立摆放时，不设置 `containerId`。

---

## 生成工具

桌面有一个可复用的生成脚本：`gen_excalidraw_skill.js`。

一般流程：
1. 用户提供脚本/大纲
2. 按每页规范编写生成代码
3. 运行脚本生成 `.excalidraw` 文件
4. 运行合并脚本生成白板
5. 交付

---

## 反模式（不要做）

1. **不要使用彩色填充背景** — 所有矩形背景透明，纯黑白红三色
2. **不要使用 emoji 表情** — 影响手写风格统一性
3. **不要使用字体家族 1/2/3** — 只用 `fontFamily: 5`（Excalifont）
4. **不要在文字内部用大段换行** — 多行文字用 `\n` 手动分行，每行不超过 15-18 个中文字
5. **不要粘贴文字到容器里自动换行** — 手动控制容器高度，每行 24-30px
6. **不要让箭头跨页面连接** — 合并白板时页与页之间的箭头会断裂
7. **不要超过每页 20 个元素** — 信息过密时拆分
8. **不要使用 `fillStyle: "hachure"` 或其他填充纹理** — 保持极简
