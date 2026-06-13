// 合并 7 张幻灯片到一个白板（纵向排列，适合录屏滚动）
// 运行: node ~/Desktop/merge_whiteboard.js
// 输出: ~/Desktop/whiteboard_merged.excalidraw

const fs = require("fs"), path = require("path");
const D = "/Users/andyxqzhang/Desktop";

const files = [
  "01_推翻旧认知.excalidraw",
  "02_临界点.excalidraw",
  "03_沉没成本.excalidraw",
  "04_案例拆解.excalidraw",
  "05_双开关.excalidraw",
  "06_别追播放量.excalidraw",
  "07_收网转化.excalidraw"
];

const SLIDE_W = 500;   // 每张宽度
const SLIDE_H = 580;   // 每张高度
const GAP = 250;       // 间距（录屏时一次只看到一张，推荐 200-300px）

let allEls = [];
let globalSeed = 1;

files.forEach((f, i) => {
  const data = JSON.parse(fs.readFileSync(path.join(D, f), "utf8"));
  const offsetY = i * (SLIDE_H + GAP);

  data.elements.forEach(el => {
    // 克隆并偏移 y 坐标
    const clone = JSON.parse(JSON.stringify(el));
    clone.y += offsetY;
    clone.seed = globalSeed++;
    // 清理 boundElements 避免跨页引用
    if (clone.boundElements) {
      // 只保留文本类型的 boundElements（框内的文字）
      if (Array.isArray(clone.boundElements)) {
        clone.boundElements = clone.boundElements.filter(be => be.type === "text");
        if (clone.boundElements.length === 0) clone.boundElements = null;
      }
    }
    // 清理箭头的 startBinding/endBinding（跨页会坏）
    if (clone.type === "arrow") {
      clone.startBinding = null;
      clone.endBinding = null;
    }
    allEls.push(clone);
  });
});

const output = {
  type: "excalidraw",
  version: 2,
  source: "claude-code",
  elements: allEls,
  appState: { viewBackgroundColor: "#ffffff" }
};

fs.writeFileSync(path.join(D, "whiteboard_merged.excalidraw"), JSON.stringify(output, null, 2));
console.log(`✅ 合并完成！共 ${allEls.length} 个元素，${files.length} 张幻灯片。`);
console.log("📄 文件: ~/Desktop/whiteboard_merged.excalidraw");
console.log("💡 用 excalidraw.com 打开，滚动浏览即可。");
