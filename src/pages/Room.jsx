// 猫窝：像素猫的小房间。猫会自己溜达/吃饭/睡觉/玩球，也可以点按钮指挥它们。
// 数值和主页资料卡共用同一份 localStorage 存档（同一个 key）。
import { useEffect, useRef, useState } from 'react';
import PixelCat from '../components/PixelCat.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useTheme } from '../context/ThemeContext.jsx';

// 家具的位置（横坐标，百分比）
const SPOTS = { bed: 12, ball: 45, bowl: 80 };
// 每种行为去哪个家具
const ACT_SPOT = { eat: 'bowl', sleep: 'bed', play: 'ball' };
// 每种行为对数值的影响
const ACT_EFFECT = {
  eat:   s => ({ ...s, fullness: Math.min(100, s.fullness + 15) }),
  sleep: s => ({ ...s, mood: Math.min(100, s.mood + 5) }),
  play:  s => ({ ...s, mood: Math.min(100, s.mood + 10) }),
};

export default function Room() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState('xxg');  // 当前选中的猫

  // 两只猫的位置和行为：x 横坐标(%)，flip 朝向，action 在干嘛
  const [cats, setCats] = useState({
    dgg: { x: 30, action: 'idle', flip: false },
    xxg: { x: 65, action: 'idle', flip: true },
  });

  // 和主页 CatCard 共用同一个 key —— 两边操作的是同一份存档
  const [dggStats, setDggStats] = useLocalStorage('stats-dgg', { mood: 80, fullness: 80 });
  const [xxgStats, setXxgStats] = useLocalStorage('stats-xxg', { mood: 80, fullness: 80 });
  const statsOf = id => (id === 'dgg' ? dggStats : xxgStats);
  const setStatsOf = id => (id === 'dgg' ? setDggStats : setXxgStats);

  // 定时器统一管理，卸载时全部清掉（第 19 课 cleanup）
  const timers = useRef([]);
  const later = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // cats 的最新值镜像到 ref，供"大脑"定时器读取（避免闭包拿旧值）
  const catsRef = useRef(cats);
  useEffect(() => { catsRef.current = cats; });

  // 指挥一只猫：走到目标点 → 做动作 → 数值变化 → 回到待机
  function command(id, act) {
    const spotX = act === 'wander' ? 15 + Math.random() * 65 : SPOTS[ACT_SPOT[act]];
    setCats(c => ({ ...c, [id]: { x: spotX, action: 'walk', flip: spotX < c[id].x } }));
    later(() => {
      if (act !== 'wander') {
        setCats(c => ({ ...c, [id]: { ...c[id], action: act } }));
        setStatsOf(id)(ACT_EFFECT[act]);  // 行为影响数值
        later(() => setCats(c => ({ ...c, [id]: { ...c[id], action: 'idle' } })),
          act === 'sleep' ? 8000 : 4000);  // 睡觉久一点
      } else {
        setCats(c => ({ ...c, [id]: { ...c[id], action: 'idle' } }));
      }
    }, 1400);  // 等走路动画（CSS transition 1.4s）走完
  }

  // 猫的"大脑"：每 4 秒，闲着没事的猫有 60% 概率自己找事做
  useEffect(() => {
    const brain = setInterval(() => {
      for (const id of ['dgg', 'xxg']) {
        if (catsRef.current[id].action === 'idle' && Math.random() < 0.6) {
          const acts = ['eat', 'sleep', 'play', 'wander', 'wander'];
          command(id, acts[Math.floor(Math.random() * acts.length)]);
        }
      }
    }, 4000);
    return () => clearInterval(brain);
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>🎮 猫窝</h2>

      {/* 顶部：选中哪只猫 + 它的数值 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['dgg', 'xxg'].map(id => {
          const s = statsOf(id);
          return (
            <button
              key={id}
              onClick={() => setSelected(id)}
              style={{
                padding: '6px 14px', borderRadius: 12, cursor: 'pointer',
                border: `1px solid ${colors.accent}`,
                background: selected === id ? colors.accent : colors.cardBg,
                color: selected === id ? '#fff' : colors.text,
                fontSize: 14,
              }}
            >
              {id === 'dgg' ? '大大怪' : '小小乖'}　😻{s.mood} 🍖{s.fullness}
            </button>
          );
        })}
      </div>

      {/* 指挥按钮：作用于选中的猫 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => command(selected, 'eat')}>🍗 喂食</button>
        <button onClick={() => command(selected, 'play')}>🧶 玩球</button>
        <button onClick={() => command(selected, 'sleep')}>😴 哄睡</button>
      </div>

      {/* 房间 */}
      <div style={{
        position: 'relative',
        height: 360,
        borderRadius: 16,
        overflow: 'hidden',
        background: `linear-gradient(to bottom, ${colors.cardBg} 62%, ${colors.accentSoft} 62%)`,  // 墙和地板
        border: `1px solid ${colors.border}`,
      }}>
        {/* 家具（emoji 布景） */}
        <span style={{ position: 'absolute', left: `${SPOTS.bed}%`, bottom: 16, fontSize: 44, transform: 'translateX(-50%)' }}>🛏️</span>
        <span style={{ position: 'absolute', left: `${SPOTS.ball}%`, bottom: 12, fontSize: 32, transform: 'translateX(-50%)' }}>🧶</span>
        <span style={{ position: 'absolute', left: `${SPOTS.bowl}%`, bottom: 12, fontSize: 36, transform: 'translateX(-50%)' }}>🥣</span>

        {/* 两只猫：位置是 state，left 变化时 CSS transition 平滑走过去 */}
        {['dgg', 'xxg'].map(id => (
          <div
            key={id}
            onClick={() => {
              setSelected(id);
              setStatsOf(id)(s => ({ ...s, mood: Math.min(100, s.mood + 10) }));  // 撸猫
            }}
            style={{
              position: 'absolute',
              left: `${cats[id].x}%`,
              bottom: 40,
              transform: `translateX(-50%) ${cats[id].flip ? 'scaleX(-1)' : ''}`,
              transition: 'left 1.4s ease-in-out',
              cursor: 'pointer',
              animation: cats[id].action === 'walk' ? 'bob 0.35s infinite' : 'none',
              outline: selected === id ? `2px solid ${colors.accent}` : 'none',
              outlineOffset: 4,
              borderRadius: 8,
            }}
          >
            <PixelCat catId={id} px={7} />
            {/* 行为气泡 */}
            {cats[id].action === 'sleep' && (
              <span style={{ position: 'absolute', top: -22, right: -14, fontSize: 18, animation: 'floatUp 1.6s infinite' }}>💤</span>
            )}
            {cats[id].action === 'eat' && (
              <span style={{ position: 'absolute', top: -22, right: -14, fontSize: 16, animation: 'floatUp 1s infinite' }}>😋</span>
            )}
            {cats[id].action === 'play' && (
              <span style={{ position: 'absolute', top: -22, right: -14, fontSize: 16, animation: 'floatUp 1s infinite' }}>❤️</span>
            )}
          </div>
        ))}

        {/* 行内 CSS 动画（keyframes 没法写在 inline style 里，所以放 <style> 标签） */}
        <style>{`
          @keyframes bob { 0%,100% { margin-bottom: 0 } 50% { margin-bottom: 6px } }
          @keyframes floatUp { 0% { opacity: 0; transform: translateY(6px) } 30% { opacity: 1 } 100% { opacity: 0; transform: translateY(-14px) } }
        `}</style>
      </div>

      <p style={{ color: colors.textSub, fontSize: 13 }}>
        点猫 = 选中 + 撸它（心情+10）。按钮指挥选中的猫。放着不管它们也会自己找事做。
      </p>
    </div>
  );
}
