// 全站配色：浅色/深色两套色板。组件不写死颜色，全部通过 useTheme() 取当前这套。

export const lightColors = {
  bg: '#fdf6ec',          // 页面底色：奶油
  cardBg: '#ffffff',      // 卡片底色
  accent: '#ff8c42',      // 主色：暖橙
  accentSoft: '#fff0e0',  // 主色浅版（标签底色）
  text: '#3d2c29',        // 正文：深棕黑
  textSub: '#a08c85',     // 次要文字：灰棕
  border: '#f0e2d4',      // 描边：浅棕
};

export const darkColors = {
  bg: '#1e1a17',          // 页面底色：深棕黑
  cardBg: '#2b2521',      // 卡片底色：深棕
  accent: '#ff8c42',      // 主色不变，暖橙在深色上依然好看
  accentSoft: '#3d2f24',  // 主色浅版的深色变体
  text: '#f0e6dd',        // 正文：米白
  textSub: '#8a7a70',     // 次要文字：暗灰棕
  border: '#40352c',      // 描边：深棕
};
