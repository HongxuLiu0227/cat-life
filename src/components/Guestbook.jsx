// 留言板：受控表单 + 留言列表（增、删），localStorage 持久化
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Guestbook() {
  const { colors } = useTheme();
  // 留言列表：{ id, author, text, time }
  // useLocalStorage：用法和 useState 完全一样，但刷新后数据还在
  const [messages, setMessages] = useLocalStorage('guestbook-messages', [
    { id: 1, author: '铲屎官', text: '大大怪今天又把水杯推下桌子了。', time: '10:00' },
  ]);

  // 两个输入框各一个 state（受控组件）
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();  // 阻止 <form> 提交的默认行为（整页刷新）
    if (!text.trim()) return;  // 内容为空（或全是空格）不提交

    const newMessage = {
      id: crypto.randomUUID(),
      author: author.trim() || '匿名访客',  // 昵称留空就给个默认名
      text: text.trim(),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([newMessage, ...messages]);  // 新的插到最前面
    setText('');   // 清空内容框，昵称留着方便连续留言
  }

  function handleDelete(id) {
    setMessages(messages.filter(m => m.id !== id));
  }

  return (
    <section style={{ marginTop: 40 }}>
      <h2>💬 留言板（{messages.length} 条）</h2>

      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        background: colors.cardBg, borderRadius: 16, padding: 16,
        boxShadow: '0 4px 16px rgba(61,44,41,0.08)',
      }}>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="你的昵称（可留空）"
          style={{
            padding: 10, borderRadius: 8, border: `1px solid ${colors.border}`,
            background: colors.bg, fontSize: 14,
          }}
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="想对猫咪说什么？"
          rows={3}
          style={{
            padding: 10, borderRadius: 8, border: `1px solid ${colors.border}`,
            background: colors.bg, fontSize: 14, resize: 'vertical',
          }}
        />
        <button type="submit" style={{
          padding: '10px 0',
          borderRadius: 8,
          border: 'none',
          background: colors.accent,
          color: '#fff',
          fontSize: 15,
          cursor: 'pointer',
        }}>
          发布留言
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {messages.map(m => (
          <li key={m.id} style={{
            background: colors.cardBg,
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 8,
            boxShadow: '0 2px 8px rgba(61,44,41,0.05)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{m.author}</strong>
              <span style={{ color: colors.textSub, fontSize: 13 }}>{m.time}</span>
            </div>
            <p style={{ margin: '6px 0 0', color: colors.text }}>{m.text}</p>
            <button
              onClick={() => handleDelete(m.id)}
              style={{
                marginTop: 6, padding: 0, border: 'none', background: 'none',
                color: colors.textSub, fontSize: 12, cursor: 'pointer',
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
