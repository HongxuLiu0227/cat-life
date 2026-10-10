// 像素猫：形状用字符网格定义，颜色按猫换配色方案
//
// 字符含义：
//   . 透明   K 身体主色   s 条纹深色   w 白色（口鼻/胸/爪）
//   i 耳朵内侧粉   n 鼻子粉   e 眼睛
// 同一份形状，大大怪和小小乖只是 PALETTES 里配色不同。

const ROWS = [
  '................',
  '..KK........KK..',
  '.KiiK......KiiK.',
  '.KKKKKKKKKKKKKK.',
  '.KKKKKKKKKKKKKK.',
  '.KKKKeKKKKeKKKK.',
  '.KKKKKKnnKKKKKK.',
  '.KKKKKwwwwKKKKK.',
  '..ssKKwwwwKKss..',
  '..ssKKwwwwKKss..',
  '.ssKKKwwwwKKKss.',
  '..ww........ww..',
];

const PALETTES = {
  dgg: { // 大大怪：银灰色
    K: '#9aa3ad', s: '#5f6b76', w: '#f8fafc',
    i: '#f9a8d4', n: '#f472b6', e: '#b45309',
  },
  xxg: { // 小小乖：狸花加白
    K: '#8a6b4f', s: '#4a3524', w: '#ffffff',
    i: '#f9a8d4', n: '#f472b6', e: '#65a30d',
  },
};

export default function PixelCat({ catId, px = 7 }) {
  const pal = PALETTES[catId];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(16, ${px}px)`,
      imageRendering: 'pixelated',  // 像素风关键：放大时保持硬边，不模糊
    }}>
      {ROWS.flatMap((row, y) =>
        row.padEnd(16, '.').split('').map((ch, x) => (
          <div
            key={`${y}-${x}`}
            style={{ width: px, height: px, background: pal[ch] || 'transparent' }}
          />
        ))
      )}
    </div>
  );
}
