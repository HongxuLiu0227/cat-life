// 所有猫咪数据集中在这里。改内容只改这个文件，组件不用动。
// 这是"单一真相"：数据只有一份，组件负责显示。
//
// media 数组的每一项是 { type, url }：
//   type: 'image' → 相册渲染 <img>
//   type: 'video' → 相册渲染 <video>
// 本地文件放在 public/photos/<猫id>/ 下。
//
// 注意 p() 的作用：Vite 打包时的 base 前缀（Vercel 是 '/'，GitHub Pages 是 '/cat-life/'）
// 不会自动加到 JS 字符串里的路径上，所以要手动拼 import.meta.env.BASE_URL。
const B = import.meta.env.BASE_URL;
const p = path => `${B}${path}`;

export const cats = [
  {
    id: 'dgg',
    name: '大大怪',
    breed: '中华田园猫',
    birthday: '2026-04-01',
    avatar: p('photos/dgg/6.jpg'),
    tags: ['嘤嘤怪', '干饭王', '小人类', '巡回糕手'],
    intro: '老大，不像猫，更像个小人、会撒娇、什么都能吃。会玩巡回游戏。凌晨五点准时和小小乖蹦迪。',
    // 真实照片（头像待主人挑选后替换）
    media: [
      // 照片
      { type: 'image', url: p('photos/dgg/1.jpg') },
      { type: 'image', url: p('photos/dgg/2.jpg') },
      { type: 'image', url: p('photos/dgg/3.jpg') },
      { type: 'image', url: p('photos/dgg/4.jpg') },
      { type: 'image', url: p('photos/dgg/5.jpg') },
      { type: 'image', url: p('photos/dgg/6.jpg') },
      { type: 'image', url: p('photos/dgg/7.jpg') },
      { type: 'image', url: p('photos/dgg/8.jpg') },
      { type: 'image', url: p('photos/dgg/9.jpg') },
      { type: 'image', url: p('photos/dgg/10.jpg') },
      { type: 'image', url: p('photos/dgg/11.jpg') },
      { type: 'image', url: p('photos/dgg/12.jpg') },
      { type: 'image', url: p('photos/dgg/13.jpg') },
      { type: 'image', url: p('photos/dgg/14.jpg') },
      { type: 'image', url: p('photos/dgg/15.jpg') },
      { type: 'image', url: p('photos/dgg/16.jpg') },
      { type: 'image', url: p('photos/dgg/17.jpg') },
      { type: 'image', url: p('photos/dgg/18.jpg') },
      { type: 'image', url: p('photos/dgg/19.jpg') },
      { type: 'image', url: p('photos/dgg/20.jpg') },
      { type: 'image', url: p('photos/dgg/21.jpg') },
      { type: 'image', url: p('photos/dgg/22.jpg') },
      // 视频
      { type: 'video', url: p('photos/dgg/v1.mp4') },
      { type: 'video', url: p('photos/dgg/v2.mp4') },
    ],
  },
  {
    id: 'xxg',
    name: '小小乖',
    breed: '中华田园猫',
    birthday: '2026-04-01',
    avatar: p('photos/xxg/avatar.jpg'),   // 想换就改成 /photos/xxg/N.jpg
    tags: ['可爱捏', '翻肚怪', '咕噜怪', '玩球大王'],
    intro: '一摸屁股就倒下，喜欢摸肚子咕噜叫，最爱玩球和绳子，能别凌晨4点多埋屎么求求了。',
    media: [
      // 照片
      { type: 'image', url: p('photos/xxg/1.jpg') },
      { type: 'image', url: p('photos/xxg/2.jpg') },
      { type: 'image', url: p('photos/xxg/3.jpg') },
      { type: 'image', url: p('photos/xxg/4.jpg') },
      { type: 'image', url: p('photos/xxg/5.jpg') },
      { type: 'image', url: p('photos/xxg/6.jpg') },
      { type: 'image', url: p('photos/xxg/7.jpg') },
      { type: 'image', url: p('photos/xxg/8.jpg') },
      { type: 'image', url: p('photos/xxg/9.jpg') },
      { type: 'image', url: p('photos/xxg/10.jpg') },
      { type: 'image', url: p('photos/xxg/11.jpg') },
      { type: 'image', url: p('photos/xxg/12.jpg') },
      { type: 'image', url: p('photos/xxg/13.jpg') },
      { type: 'image', url: p('photos/xxg/14.jpg') },
      { type: 'image', url: p('photos/xxg/15.jpg') },
      { type: 'image', url: p('photos/xxg/16.jpg') },
      { type: 'image', url: p('photos/xxg/17.jpg') },
      { type: 'image', url: p('photos/xxg/18.jpg') },
      { type: 'image', url: p('photos/xxg/19.jpg') },
      // 视频
      { type: 'video', url: p('photos/xxg/v1.mp4') },
      { type: 'video', url: p('photos/xxg/v2.mp4') },
      { type: 'video', url: p('photos/xxg/v3.mp4') },
      { type: 'video', url: p('photos/xxg/v4.mp4') },
      { type: 'video', url: p('photos/xxg/v5.mp4') },
      { type: 'video', url: p('photos/xxg/v6.mp4') },
      { type: 'video', url: p('photos/xxg/v7.mp4') },
      { type: 'video', url: p('photos/xxg/v8.mp4') },
    ],
  },
];
