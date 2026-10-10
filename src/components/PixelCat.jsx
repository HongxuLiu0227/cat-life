// 像素猫：侧面桌宠风。形状用字符网格定义，颜色按猫换配色方案。
//
// 字符含义：
//   . 透明   K 身体主色   s 条纹深色   w 白色（嘴/爪）
//   i 耳朵内侧粉   n 鼻子粉   e 眼睛
//
// 动画原理：准备好几帧（FRAMES），组件按 frame 属性换帧——
// 和翻页动画书一样，快速切换略有不同的画面就是"动"。

// 站立帧 A：尾巴在左侧自然下垂
const STAND_A = [
  '....................',
  '............K...K...',
  '...........KKKKKKK..',
  '...........KiKKKiK..',
  '...........KKeKKeK..',
  '...........KKKKKww..',
  '...........KKKKKKn..',
  '..K........KKKKKK...',
  '..KKKKKKKKKKKKKK....',
  '.KKKKKsKKsKKsKKK....',
  '..KKKKKKKKKKKKKK....',
  '.....KK.....KK......',
  '.....ww.....ww......',
];

// 站立帧 B：尾巴翘起（和 A 交替播放 = 摇尾巴）
const STAND_B = [
  '....................',
  '............K...K...',
  '...........KKKKKKK..',
  '...........KiKKKiK..',
  '...........KKeKKeK..',
  '...........KKKKKww..',
  '.K.........KKKKKKn..',
  '.KK........KKKKKK...',
  'KKKKKKKKKKKKKKKK....',
  '.KKKKsKKsKKsKKK.....',
  '..KKKKKKKKKKKKKK....',
  '.....KK.....KK......',
  '.....ww.....ww......',
];

// 走路帧 B：两条腿错开（和 STAND_A 交替播放 = 走路）
const WALK_B = [
  '....................',
  '............K...K...',
  '...........KKKKKKK..',
  '...........KiKKKiK..',
  '...........KKeKKeK..',
  '...........KKKKKww..',
  '...........KKKKKKn..',
  '..K........KKKKKK...',
  '..KKKKKKKKKKKKKK....',
  '.KKKKKsKKsKKsKKK....',
  '..KKKKKKKKKKKKKK....',
  '....KK.......KK.....',
  '....ww.......ww.....',
];

// 睡觉帧：闭眼（眼睛行变成纯色），身体趴下，尾巴收在身前
const SLEEP = [
  '....................',
  '............K...K...',
  '...........KKKKKKK..',
  '...........KiKKKiK..',
  '...........KKKKKKK..',
  '...........KKKKKww..',
  '...........KKKKKKn..',
  '..K........KKKKKK...',
  '..KKKKKKKKKKKKKK....',
  '.KKKKKsKKsKKsKKK....',
  '...ssKKKKKKKKKKK....',
  '....ssssssssss......',
  '....................',
];

export const FRAMES = {
  idleA: STAND_A,
  idleB: STAND_B,
  walkA: STAND_A,
  walkB: WALK_B,
  sleep: SLEEP,
  eat: STAND_A,
};

const PALETTES = {
  dgg: { // 大大怪：银灰色
    K: '#9aa3ad', s: '#5f6b76', w: '#f8fafc',
    i: '#f9a8d4', n: '#f472b6', e: '#1f2937',
  },
  xxg: { // 小小乖：狸花加白
    K: '#8a6b4f', s: '#4a3524', w: '#ffffff',
    i: '#f9a8d4', n: '#f472b6', e: '#1f2937',
  },
};

export default function PixelCat({ catId, frame = 'idleA', px = 6 }) {
  const pal = PALETTES[catId];
  const rows = FRAMES[frame];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(20, ${px}px)`,
      imageRendering: 'pixelated',  // 像素风关键：放大时保持硬边，不模糊
    }}>
      {rows.flatMap((row, y) =>
        row.padEnd(20, '.').split('').map((ch, x) => (
          <div
            key={`${y}-${x}`}
            style={{ width: px, height: px, background: pal[ch] || 'transparent' }}
          />
        ))
      )}
    </div>
  );
}
