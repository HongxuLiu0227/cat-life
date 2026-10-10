// 自定义 Hook：用法和 useState 一模一样，但数据自动同步到 localStorage
//
//   const [value, setValue] = useLocalStorage('my-key', 初始值);
//
// 刷新页面后数据还在。名字必须以 use 开头，React 才会按 Hook 的规则对待它。
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 初始值改成"懒初始化"：传一个函数，React 只在第一次渲染时调用它。
  // 函数里先去 localStorage 找存档，有就用存档，没有才用 initialValue。
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // 每次渲染后，如果 value 变了（在依赖数组里），就把新值写进 localStorage。
  // localStorage 只能存字符串，所以对象/数组要 JSON.stringify 转成字符串，
  // 读出来时再用 JSON.parse 转回来。
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
