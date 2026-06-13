# excalidraw-whiteboard

强哥的 Excalidraw 白板幻灯片工具集。手写 Excalifont 字体、黑白红三色、3:4 竖版、教学白板风。

适合用于知识口播视频配图、录屏展示、小红书/抖音内容素材。

## 长什么样？

| 推翻旧认知 | 临界点 | 沉没成本 |
|-----------|--------|---------|
| ![推翻旧认知](assets/slide01_overview.svg) | ![临界点](assets/slide02_critical.svg) | ![沉没成本](assets/slide03_sunkcost.svg) |

> 尺寸：每张 **500×667px（3:4 竖版）**，适配手机画幅录屏展示。
> 多张幻灯片可合并为纵向白板，滚动浏览。
> 
> 页数不固定——基于脚本内容自动判断，一个核心观点 = 一张幻灯片。

## 使用方式

**获取到 `.excalidraw` 文件后：**

1. 打开 [excalidraw.com](https://excalidraw.com) 或 [xdraw.app](https://xdraw.app)
2. 点击 **Open → 选择文件**
3. 所有文字、框、箭头可随意拖拽修改
4. 改完后 Export → Image 导出 PNG/SVG

> 支持**二次编辑**。你可以随时打开文件调整文字、移动布局、修改颜色，全部保留可编辑状态。

## 安装

```bash
npx skills add zhangxiaoqiang1991/excalidraw-whiteboard
```

## 使用方法

> ⚠️ **先磨脚本，再出白板。** 这个工具是视觉输出工具，不是内容创作工具。脚本没磨好之前不要用。

**正确流程：**

```
第一步：用 AI 打磨口播脚本 → 脚本定稿
第二步：调用白板幻灯片 Skill → 生成白板图
第三步：excalidraw.com 打开 → 录屏 / 截图
```

## 设计风格

- **字体**: Excalifont (fontFamily: 5) — 手写质感
- **配色**: 黑白红三色（正文 `#1e1e1e` / 强调 `#e03131` / 辅助 `#868e96`）
- **填充**: 所有矩形背景透明，无色块填充
- **手感**: roughness: 2-3，手绘粗糙感
- **比例**: 3:4 竖版，适配手机画幅
- **布局**: 标题居中 + 下划线，正文左对齐，宽松行距

## 尺寸建议

| 场景 | 推荐尺寸 | 说明 |
|------|---------|------|
| 单张幻灯片 | 500 × 667px | 3:4 竖版，一句一页 |
| 合并白板 | 500 × (n × 1000)px | n 为页数，每页约 580px + 420px 间隔，录屏时一次只看一张 |
| 视频配图 | 500 × 667px | 直接截图或导出 PNG |
| 小红书 | 500 × 667px | 适配竖版图文 |

## 打开方式

`.excalidraw` 文件可以用以下方式打开：

| 方式 | 链接 | 说明 |
|------|------|------|
| **Excalidraw** | [excalidraw.com](https://excalidraw.com) | 官方白板工具，免费，无需注册 |
| **XDraw** | [xdraw.app](https://xdraw.app) | 中文界面，体验更顺畅 |
| **VS Code 插件** | 插件市场搜 `excalidraw` | 开发者友好，可在编辑器内编辑 |

## 依赖

- curl（Kroki 导出用，macOS/Linux 预装）
- 或 excalidraw.com（手动打开编辑）

## 许可证

MIT

---

## 关于我

**大厂转型人强哥**（全网同名）

河北邯郸人，曾武汉求学，现居北京。曾就职腾讯、字节跳动。目前负责 AI + 内容增长、产品运营。关注以下三方面的机会，欢迎交流 / 围观朋友圈：

- **AI 内容运营**：从战略、策略到执行的内容增长
- **AI 培训 / 布道**：帮团队真正用好 AI，不只是上个课
- **AI 内部提效**：搭建工具流，把 AI 落地到业务流程里

**找到我：**

| 平台 | 账号 |
|------|------|
| 微信 | `qianggegood123`（有付费社群和咨询，若感兴趣私聊即可） |
| 小红书 | [强哥 @andyxqzhang](https://www.xiaohongshu.com/user/profile/andyxqzhang) |
| Twitter / X | [@andyxqzhang001](https://x.com/andyxqzhang001) |
| GitHub | [zhangxiaoqiang1991](https://github.com/zhangxiaoqiang1991) |

有任何问题或反馈，欢迎提 [Issues](https://github.com/zhangxiaoqiang1991/excalidraw-whiteboard/issues) 或加微信交流。这些反馈比 star 值钱。
