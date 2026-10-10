// 根组件：左侧导航栏 + 右侧页面区（React Router 版）
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { cats } from './data/cats.js';
import Home from './pages/Home.jsx';
import Room from './pages/Room.jsx';
import Gallery from './components/Gallery.jsx';
import Guestbook from './components/Guestbook.jsx';
import { useTheme } from './context/ThemeContext.jsx';

// 导航配置：路径 + 显示文字。加页面时在这里加一项
const navItems = [
  { path: '/', label: '🏠 主页' },
  { path: '/room', label: '🎮 猫窝' },
  { path: '/gallery', label: '📷 相册' },
  { path: '/guestbook', label: '💬 留言板' },
];

export default function App() {
  // 订阅主题广播：色板 + 当前模式 + 切换函数
  const { colors, mode, toggle } = useTheme();

  return (
    // BrowserRouter：接管浏览器的地址栏，URL 变化时切换组件（不刷新页面）
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>

        {/* 左侧导航栏：固定在左边，不随内容滚动 */}
        <nav style={{
          width: 180,
          padding: '24px 16px',
          borderRight: `1px solid ${colors.border}`,
          position: 'sticky',
          top: 0,
          height: '100vh',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h1 style={{ fontSize: 18, margin: '0 0 24px' }}>🐱 大大怪&小小乖</h1>

          {navItems.map(item => (
            // NavLink：特殊的链接，知道自己"是不是当前页面"（isActive）
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}   // 主页路径是 /，必须精确匹配，否则永远高亮
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                marginBottom: 8,
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 15,
                background: isActive ? colors.accent : 'transparent',
                color: isActive ? '#fff' : colors.text,
              })}
            >
              {item.label}
            </NavLink>
          ))}

          {/* 主题切换：marginTop:auto 把它顶到导航栏底部 */}
          <button
            onClick={toggle}
            style={{
              marginTop: 'auto',
              padding: '10px 14px',
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.cardBg,
              color: colors.text,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {mode === 'light' ? '🌙 深色模式' : '☀️ 浅色模式'}
          </button>
        </nav>

        {/* 右侧页面区：Routes 根据当前 URL 决定渲染谁 */}
        <main style={{ flex: 1, padding: '32px 24px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<Room />} />
            <Route path="/gallery" element={<Gallery cats={cats} />} />
            <Route path="/guestbook" element={<Guestbook />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
