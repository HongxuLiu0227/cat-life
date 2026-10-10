import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

// 整个项目唯一碰真实 DOM 的地方：
// 找到 index.html 里的 <div id="root">，在上面创建 React 根，
// 从此这个 div 内部的 DOM 归 React 全权管理。
// 只在页面加载时执行一次，之后的界面更新全由 React 内部完成。
createRoot(document.getElementById('root')).render(
  // StrictMode：严格模式，只在开发环境生效，不渲染任何可见内容。
  // 它会故意把组件函数、reducer、effect 执行两遍，帮你提前发现
  // "渲染不纯""effect 没写清理"这类 bug。打包上线后自动消失。
  <StrictMode>
    {/* ThemeProvider：主题广播站，包住 App，里面所有组件都能 useTheme() */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
