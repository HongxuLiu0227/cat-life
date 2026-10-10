// 猫咪资料卡：展示 + 心情/饱食互动
import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useTheme } from '../context/ThemeContext.jsx';

// 一条状态栏：标签 + 进度条（小组件，只有本文件用，就不单独开文件了）
function StatBar({ label, value, color }) {
  const { colors } = useTheme();
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14 }}>{label}</span>
        <span style={{ fontSize: 13, color: colors.textSub }}>{value} / 100</span>
      </div>
      {/* 进度条：宽度 = 数值百分比 */}
      <div style={{ background: colors.border, borderRadius: 4, height: 8, marginTop: 4 }}>
        <div style={{
          width: `${value}%`,
          height: '100%',
          borderRadius: 4,
          background: value > 40 ? color : colors.accent,  // 太低了就用主色警示
          transition: 'width 0.3s',
        }} />
      </div>
    </div>
  );
}

export default function CatCard({ cat }) {
  const { colors } = useTheme();  // 订阅主题广播：换肤时自动重渲染

  // 两项数值合并成一个对象：总是一起衰减、一起存档（军规 4）
  const [stats, setStats] = useLocalStorage(`stats-${cat.id}`, { mood: 80, fullness: 80 });

  // 随时间下降：每 1 分钟，心情 -2，饱食 -3
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(s => ({
        mood: Math.max(0, s.mood - 2),
        fullness: Math.max(0, s.fullness - 3),
      }));
    }, 60000);
    return () => clearInterval(timer);  // 清理函数：组件卸载时停掉计时器
  }, []);

  // 表情由心情值算出来（军规 1：不存 state）
  const emoji = stats.mood > 70 ? '😻' : stats.mood > 40 ? '😺' : '😾';

  return (
    <div style={{
      background: colors.cardBg,
      borderRadius: 16,
      padding: 16,
      width: 320,
      boxShadow: '0 4px 16px rgba(61,44,41,0.08)',
    }}>
      <img
        src={cat.avatar}
        alt={cat.name}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',   // 格子固定正方形
          objectFit: 'cover',     // 内容裁切填满
          borderRadius: 12,
        }}
      />
      <h2 style={{ margin: '12px 0 4px' }}>{cat.name}</h2>
      <p style={{ margin: 0, color: colors.textSub, fontSize: 14 }}>
        {cat.breed} · 生于 {cat.birthday}
      </p>

      {/* 性格标签 */}
      <div style={{ display: 'flex', gap: 8, margin: '12px 0', flexWrap: 'wrap' }}>
        {cat.tags.map(tag => (
          <span key={tag} style={{
            background: colors.accentSoft,
            color: colors.accent,
            borderRadius: 12,
            padding: '2px 10px',
            fontSize: 13,
          }}>
            {tag}
          </span>
        ))}
      </div>

      <p style={{ color: colors.text, lineHeight: 1.7, margin: 0, fontSize: 14 }}>{cat.intro}</p>

      {/* 状态区：心情 + 饱食 */}
      <div style={{ marginTop: 12, borderTop: `1px solid ${colors.border}`, paddingTop: 12 }}>
        <StatBar label={`心情 ${emoji}`} value={stats.mood} color="#7bc96f" />
        <StatBar label="饱食 🍖" value={stats.fullness} color="#4a90d9" />

        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button
            onClick={() => setStats(s => ({ ...s, mood: Math.min(100, s.mood + 10) }))}
            style={{
              flex: 1, padding: '6px 0', borderRadius: 8,
              border: `1px solid ${colors.accent}`, background: colors.cardBg,
              color: colors.accent, cursor: 'pointer',
            }}
          >
            撸一下 ❤️ +10
          </button>
          <button
            onClick={() => setStats(s => ({ ...s, fullness: Math.min(100, s.fullness + 15) }))}
            style={{
              flex: 1, padding: '6px 0', borderRadius: 8,
              border: `1px solid #4a90d9`, background: colors.cardBg,
              color: '#4a90d9', cursor: 'pointer',
            }}
          >
            喂一口 🍗 +15
          </button>
        </div>
      </div>
    </div>
  );
}
