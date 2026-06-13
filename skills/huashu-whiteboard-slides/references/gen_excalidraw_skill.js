// Excalidraw 幻灯片生成器 — 遵循 excalidraw-skill 规范
// 设计: fontFamily:1 (Excalifont), roughness:2 (手绘), 黑白红
// CJK 宽度公式: max(160, charCount * 18)
// 运行: node ~/Desktop/gen_excalidraw_skill.js
// 导出: 见 export_all.sh

const fs = require("fs"), path = require("path");
const D = "/Users/andyxqzhang/Desktop";

let seed = 1;
const S = () => seed++;

function text(id, txt, x, y, w, opts = {}) {
  return {
    id, type: "text", x, y, width: w, height: opts.h || 44, angle: 0,
    strokeColor: opts.c || "#1e1e1e",
    backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: 1, strokeStyle: "solid", roughness: 2, opacity: 100,
    seed: S(), boundElements: null, updated: 1,
    text: txt, fontSize: opts.sz || 24, fontFamily: 5,
    textAlign: opts.al || "left", verticalAlign: opts.va || "top",
    containerId: opts.cid || null, originalText: txt, autoResize: true,
    lineHeight: 1.35,
  };
}

function box(id, x, y, w, h, opts = {}) {
  return {
    id, type: "rectangle", x, y, width: w, height: h, angle: 0,
    strokeColor: opts.c || "#1e1e1e",
    backgroundColor: "transparent",
    fillStyle: "solid", strokeWidth: opts.sw || 2,
    strokeStyle: "solid", roughness: 2, opacity: 100,
    seed: S(), boundElements: opts.bind || null, updated: 1,
    roundness: opts.round === false ? null : { type: 3 },
  };
}

function arr(id, x1, y1, x2, y2, opts = {}) {
  const dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1);
  return {
    id, type: "arrow", x: x1, y: y1, width: dx, height: dy, angle: 0,
    strokeColor: opts.c || "#1e1e1e",
    backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: opts.sw || 2, strokeStyle: "solid", roughness: 2, opacity: 100,
    seed: S(), boundElements: null, updated: 1,
    roundness: { type: 2 },
    points: [[0, 0], [x2 - x1, y2 - y1]],
    lastCommittedPoint: null, startBinding: null, endBinding: null,
    startArrowhead: null, endArrowhead: "arrow",
  };
}

function line(id, x1, y1, x2, y2, opts = {}) {
  return {
    id, type: "line", x: x1, y: y1,
    width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), angle: 0,
    strokeColor: opts.c || "#1e1e1e",
    backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: opts.sw || 2, strokeStyle: "solid", roughness: 3, opacity: 100,
    seed: S(), boundElements: null, updated: 1,
    roundness: { type: 2 },
    points: [[0, 0], [x2 - x1, y2 - y1]],
    lastCommittedPoint: null, startBinding: null, endBinding: null,
    startArrowhead: null, endArrowhead: null,
  };
}

function wavy(id, x, y, w, opts = {}) {
  return {
    id, type: "line", x, y, width: w, height: opts.h || 6, angle: 0,
    strokeColor: opts.c || "#e03131",
    backgroundColor: "transparent", fillStyle: "solid",
    strokeWidth: opts.sw || 3, strokeStyle: "solid", roughness: 3, opacity: 100,
    seed: S(), boundElements: null, updated: 1,
    roundness: { type: 2 },
    points: [[0,0],[w*0.15,-3-opts.h||-6],[w*0.3,opts.h+3||9],[w*0.45,-3-opts.h||-6],[w*0.6,opts.h+3||9],[w*0.75,-3-opts.h||-6],[w*0.9,opts.h+3||9],[w,0]],
    lastCommittedPoint: null, startBinding: null, endBinding: null,
    startArrowhead: null, endArrowhead: null,
  };
}

function save(els, name) {
  const data = {
    type: "excalidraw",
    version: 2,
    source: "claude-code",
    elements: els,
    appState: { viewBackgroundColor: "#ffffff" }
  };
  fs.writeFileSync(path.join(D, name), JSON.stringify(data, null, 2));
  console.log("✅ " + name);
}

// CJK 宽度
const W = (s) => Math.max(160, s.length * 20);
// 框高度
const H = 52;

// ═════════════════════════════════════
// 01：推翻旧认知
// ═════════════════════════════════════
function s1() {
  const e = [];
  e.push(text("t1", "做获客，你在研究什么？", 50, 20, 420, { sz: 34, al: "center" }));
  e.push(line("l1", 80, 68, 440, 68, { sw: 2 }));
  e.push(box("b_baokuan", 40, 105, 130, H));
  e.push(text("t_baokuan", "研究爆款", 50, 117, 110, { sz: 24, al: "center" }));
  e.push(box("b_suanfa", 190, 105, 130, H));
  e.push(text("t_suanfa", "研究算法", 200, 117, 110, { sz: 24, al: "center" }));
  e.push(box("b_renshe", 340, 105, 130, H));
  e.push(text("t_renshe", "研究人设", 350, 117, 110, { sz: 24, al: "center" }));

  // 大叉
  e.push(line("x1", 150, 195, 230, 275, { c: "#e03131", sw: 5 }));
  e.push(line("x2", 230, 195, 150, 275, { c: "#e03131", sw: 5 }));
  e.push(text("t_wrong", "全是错的", 280, 210, 200, { sz: 36, c: "#e03131" }));
  e.push(wavy("w1", 290, 270, 150));

  e.push(arr("a1", 260, 305, 260, 345));
  e.push(text("t_work", "你在帮平台打工", 80, 355, 400, { sz: 30, al: "center" }));
  e.push(text("t_keep", "平台要的是你留下来", 55, 410, 420, { sz: 22 }));
  e.push(text("t_care", "它不关心你赚不赚钱", 55, 455, 420, { sz: 22 }));
  e.push(line("sep1", 55, 500, 465, 500, { c: "#868e96", sw: 1 }));

  e.push(text("t_pay1", "真正给你掏钱的是 ", 55, 525, 260, { sz: 24 }));
  e.push(box("b_ren", 300, 518, 120, 48, { c: "#e03131", sw: 3 }));
  e.push(text("t_ren", "人", 325, 528, 70, { sz: 28, c: "#e03131", al: "center" }));

  save(e, "01_推翻旧认知.excalidraw");
}

// ═════════════════════════════════════
// 02：临界点
// ═════════════════════════════════════
function s2() {
  const e = [];
  e.push(text("t2_title", "人什么时候会掏钱？", 50, 20, 420, { sz: 34, al: "center" }));
  e.push(line("l2", 80, 68, 440, 68, { sw: 2 }));

  e.push(box("b_stateA", 40, 100, 440, 95));
  e.push(text("t_stateA", "状态 A：知道该做，但不急", 60, 112, 400, { sz: 24 }));
  e.push(text("t_stateAd", "刷了三个月，收藏二十条教程，一条没发", 60, 158, 400, { sz: 20, c: "#868e96" }));

  e.push(arr("a2_1", 260, 200, 260, 235));
  e.push(text("t_trigger", "↓ 什么事让他急了？", 305, 212, 300, { sz: 20, c: "#e03131" }));

  e.push(box("b_stateB", 40, 240, 440, 135, { c: "#e03131", sw: 3 }));
  e.push(text("t_stateB", "状态 B：临界点", 60, 252, 400, { sz: 26, c: "#e03131" }));
  e.push(text("t_cost1", "房租交了半年，人工每个月照付", 60, 300, 400, { sz: 22 }));
  e.push(text("t_cost2", "隔壁靠抖音排起队了，躺在床上睡不着", 60, 338, 400, { sz: 22 }));

  e.push(arr("a2_2", 260, 380, 260, 415));
  e.push(box("b_conclu", 50, 420, 420, 60, { c: "#e03131", sw: 3 }));
  e.push(text("t_conclu", "这就是买单的临界点", 90, 436, 340, { sz: 28, c: "#e03131", al: "center" }));
  e.push(wavy("w2", 190, 500, 140));

  e.push(line("sep2", 50, 530, 470, 530, { c: "#868e96", sw: 1 }));
  e.push(text("t_formula", "临界点 = 沉没成本 × 不甘心", 100, 552, 320, { sz: 24, c: "#e03131", al: "center" }));

  save(e, "02_临界点.excalidraw");
}

// ═════════════════════════════════════
// 03：沉没成本
// ═════════════════════════════════════
function s3() {
  const e = [];
  e.push(text("t3_title", "怎么判断谁到了临界点？", 50, 20, 420, { sz: 30, al: "center" }));
  e.push(line("l3", 80, 68, 440, 68, { sw: 2 }));

  e.push(text("t_signal", "看一个信号", 50, 105, 200, { sz: 24 }));
  e.push(box("b_money", 220, 98, 220, 52, { c: "#e03131", sw: 3 }));
  e.push(text("t_money", "他砸了多少钱", 240, 108, 180, { sz: 28, c: "#e03131", al: "center" }));

  const items = ["房租押金 — 大几万进去了", "装修 — 三十万砸下去了", "传单·美团·探店 — 全试了全没用", "人工 — 每个月照付"];
  items.forEach((item, i) => {
    const y = 175 + i * 62;
    e.push(box(`b_cost${i}`, 50, y, 420, 52));
    e.push(text(`t_cost${i}`, "💰 " + item, 65, y + 12, 390, { sz: 22 }));
  });

  e.push(arr("a3", 260, 428, 260, 458));
  e.push(box("b_result", 50, 462, 420, 65, { c: "#e03131", sw: 3 }));
  e.push(text("t_result1", "这种人找的不是方案", 70, 478, 380, { sz: 24, c: "#e03131", al: "center" }));
  e.push(text("t_result2", "找的是止损的出口", 70, 505, 380, { sz: 24, c: "#e03131", al: "center" }));

  save(e, "03_沉没成本.excalidraw");
}

// ═════════════════════════════════════
// 04：案例拆解
// ═════════════════════════════════════
function s4() {
  const e = [];
  e.push(text("t4_title", "案例：餐饮老板的视频改造", 50, 20, 420, { sz: 30, al: "center" }));
  e.push(line("l4", 80, 68, 440, 68, { sw: 2 }));

  e.push(box("b_before", 40, 95, 440, 130));
  e.push(text("t_before", "❌ 改造前", 60, 108, 200, { sz: 26 }));
  e.push(line("l4_1", 95, 128, 460, 128, { sw: 1 }));
  e.push(text("t_before1", "拍菜品 → 拍环境 → 配音乐发出去", 60, 145, 400, { sz: 22 }));
  e.push(text("t_before2", "最高一条", 60, 185, 130, { sz: 22 }));
  e.push(box("b_200", 185, 178, 110, 42, { c: "#e03131", sw: 3 }));
  e.push(text("t_200", "200播放", 195, 188, 90, { sz: 24, c: "#e03131", al: "center" }));

  e.push(arr("a4", 260, 230, 260, 265));

  e.push(box("b_after", 40, 270, 440, 155));
  e.push(text("t_after", "✅ 改造后", 60, 283, 200, { sz: 26 }));
  e.push(line("l4_2", 95, 303, 460, 303, { sw: 1 }));
  e.push(text("t_after1", "① 标题改成对用户有用的", 60, 320, 400, { sz: 22 }));
  e.push(text("t_after2", "② 内容讲「你的问题怎么解决」", 60, 355, 400, { sz: 22 }));
  e.push(text("t_after3", "③ 结尾加具体引导", 60, 390, 400, { sz: 22 }));
  e.push(text("t_after4", "→ 3万播放 + 几十个咨询", 60, 415, 400, { sz: 22, c: "#e03131" }));

  e.push(line("sep4", 50, 455, 470, 455, { c: "#868e96", sw: 1 }));
  e.push(text("t_insight1", "没有换设备，没有学剪辑", 60, 475, 400, { sz: 28 }));
  e.push(text("t_insight2", "就是换了一个", 60, 520, 220, { sz: 26 }));
  e.push(box("b_angle", 240, 513, 180, 48, { c: "#e03131", sw: 3 }));
  e.push(text("t_angle", "说话的角度", 260, 523, 140, { sz: 28, c: "#e03131", al: "center" }));

  save(e, "04_案例拆解.excalidraw");
}

// ═════════════════════════════════════
// 05：双开关
// ═════════════════════════════════════
function s5() {
  const e = [];
  e.push(text("t5_title", "怎么让他在你视频下面行动？", 50, 20, 420, { sz: 30, al: "center" }));
  e.push(line("l5", 80, 68, 440, 68, { sw: 2 }));

  e.push(box("b_sw1", 40, 90, 440, 130));
  e.push(text("t_sw1a", "开关一", 55, 102, 100, { sz: 24, c: "#e03131" }));
  e.push(text("t_sw1b", "走在前面的自己人", 165, 102, 300, { sz: 24 }));
  e.push(line("l5_1", 55, 122, 460, 122, { sw: 1 }));
  e.push(text("t_sw1c", '❌ 老师说「今天教你做获客」', 55, 138, 420, { sz: 19 }));
  e.push(text("t_sw1d", "  学生心态：先学，学会就不用找你", 75, 168, 400, { sz: 18 }));
  e.push(text("t_sw1e", '✅ 你说「大部分人路子一开始就走反了」', 55, 195, 420, { sz: 19 }));
  e.push(text("t_sw1f", "  同类心态：这人懂我，我愿意听", 75, 210, 400, { sz: 18 }));

  e.push(arr("a5_1", 260, 225, 260, 253));

  e.push(box("b_sw2", 40, 258, 440, 115));
  e.push(text("t_sw2a", "开关二", 55, 270, 100, { sz: 24, c: "#e03131" }));
  e.push(text("t_sw2b", "跟着你真能拿到结果", 165, 270, 300, { sz: 24 }));
  e.push(line("l5_2", 55, 290, 460, 290, { sw: 1 }));
  e.push(text("t_sw2c", "自己人 → 他信任你", 55, 305, 400, { sz: 22 }));
  e.push(text("t_sw2d", "确定性 → 他行动", 55, 342, 400, { sz: 22 }));

  e.push(arr("a5_2", 260, 378, 260, 408));

  e.push(box("b_concl5", 40, 413, 440, 60, { c: "#e03131", sw: 3 }));
  e.push(text("t_conc5a", "先让他觉得你懂他", 60, 428, 240, { sz: 24, c: "#e03131" }));
  e.push(text("t_conc5b", "再让他觉得你能帮他", 300, 428, 180, { sz: 24, c: "#e03131" }));
  e.push(wavy("w5", 160, 488, 200));

  save(e, "05_双开关.excalidraw");
}

// ═════════════════════════════════════
// 06：别追播放量
// ═════════════════════════════════════
function s6() {
  const e = [];
  e.push(text("t6_title", "别追播放量", 110, 20, 300, { sz: 34, al: "center" }));
  e.push(line("l6", 140, 68, 380, 68, { sw: 2 }));

  e.push(text("t6_sub", "播放量是平台给你设计的", 50, 105, 320, { sz: 24 }));
  e.push(box("b_reward", 340, 98, 140, 48, { c: "#e03131", sw: 3 }));
  e.push(text("t_reward", "情绪奖励", 365, 108, 90, { sz: 24, c: "#e03131", al: "center" }));
  e.push(text("t_slot", "跟老虎机的灯一个原理", 50, 165, 320, { sz: 22 }));

  e.push(box("b_bad", 40, 210, 440, 70));
  e.push(text("t_bad", "😵 一条视频  20万播放", 70, 225, 260, { sz: 24 }));
  e.push(text("t_zero", "0 成交", 350, 225, 100, { sz: 26, c: "#e03131", al: "center" }));
  e.push(arr("a6_1", 260, 285, 260, 315));

  e.push(box("b_good", 40, 320, 440, 70));
  e.push(text("t_good", "✅ 另一条  8000播放", 70, 335, 280, { sz: 24 }));
  e.push(text("t_paid", "4个付费用户", 350, 335, 100, { sz: 26, c: "#e03131", al: "center" }));

  e.push(line("sep6", 50, 425, 470, 425, { c: "#868e96", sw: 1 }));
  e.push(text("t_ins6a", "很多爆款内容 = 在帮整个行业做用户教育", 50, 450, 440, { sz: 20 }));
  e.push(text("t_ins6b", "你辛苦把人讲明白了", 80, 490, 300, { sz: 20 }));
  e.push(text("t_ins6c", "他去买了你同行的东西", 80, 523, 300, { sz: 20 }));
  e.push(wavy("w6", 80, 558, 260));

  save(e, "06_别追播放量.excalidraw");
}

// ═════════════════════════════════════
// 07：收网
// ═════════════════════════════════════
function s7() {
  const e = [];
  e.push(text("t7_title", "你的获客视频怎么做？", 50, 20, 420, { sz: 30, al: "center" }));
  e.push(line("l7", 80, 68, 440, 68, { sw: 2 }));

  e.push(box("b_step1", 40, 100, 200, 55));
  e.push(text("t_step1", "评论区 → 你的生意+城市", 50, 115, 180, { sz: 20, al: "center" }));
  e.push(arr("a7_1", 240, 128, 305, 128));
  e.push(text("t_step1r", "我帮你拆", 315, 115, 120, { sz: 22, c: "#e03131" }));

  e.push(arr("a7_2", 260, 160, 260, 195));
  e.push(box("b_step2", 40, 200, 200, 55));
  e.push(text("t_step2", "一条属于你行业的框架", 50, 215, 180, { sz: 20, al: "center" }));
  e.push(arr("a7_3", 240, 228, 305, 228));
  e.push(text("t_step2r", "值不值，自己判断", 315, 215, 130, { sz: 22, c: "#e03131" }));

  e.push(arr("a7_4", 260, 260, 260, 295));
  e.push(box("b_step3", 80, 300, 360, 55, { c: "#e03131", sw: 3 }));
  e.push(text("t_step3", "先打通一单，再谈放量", 110, 316, 300, { sz: 26, c: "#e03131", al: "center" }));

  e.push(line("sep7", 50, 395, 470, 395, { c: "#868e96", sw: 1 }));
  e.push(text("t_cta", "点赞收藏，免得要做的时候找不到", 80, 420, 380, { sz: 24, c: "#e03131", al: "center" }));
  e.push(wavy("w7", 130, 465, 260));

  e.push(line("sep7b", 50, 510, 470, 510, { c: "#868e96", sw: 1 }));
  e.push(box("b_brand", 80, 530, 360, 48));
  e.push(text("t_brand", "AI 内容获客 · 咨询 · 陪跑", 115, 542, 290, { sz: 22, al: "center" }));

  save(e, "07_收网转化.excalidraw");
}

s1(); s2(); s3(); s4(); s5(); s6(); s7();
console.log("\n🎉 7 张 Excalidraw 文件已生成！");
