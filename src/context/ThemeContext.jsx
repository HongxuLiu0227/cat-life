// 主题广播站（Context）：
// ThemeProvider 包住整个应用，把 { colors, mode, toggle } 广播出去；
// 任何组件调用 useTheme() 就能拿到当前色板，切换时所有订阅者一起重渲染。
import { createContext, useContext, useEffect } from 'react';
import { lightColors, darkColors } from '../theme.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // 主题选择也持久化：刷新后记住用户上次的选择（复用我们自己的 Hook）
  const [mode, setMode] = useLocalStorage('theme-mode', 'light');

  // 派生数据：当前色板由 mode 算出来
  const colors = mode === 'light' ? lightColors : darkColors;

  // body 的背景色不受 React 组件管理（它在 index.html 里），
  // 用 effect 直接同步——合法的"与外部系统同步"场景
  useEffect(() => {
    document.body.style.background = colors.bg;
    document.body.style.color = colors.text;
  }, [colors]);

  function toggle() {
    setMode(m => (m === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ colors, mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定义 Hook：订阅广播。组件里 const { colors, toggle } = useTheme();
export function useTheme() {
  return useContext(ThemeContext);
}
