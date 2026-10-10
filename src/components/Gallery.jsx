// 照片画廊：切换猫咪 + 照片/视频切换 + 灯箱（点开大图）
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Gallery({ cats }) {
  const { colors } = useTheme();
  const [activeId, setActiveId] = useState(cats[0].id); // 当前看哪只猫
  const [mediaType, setMediaType] = useState('image');  // 当前看照片还是视频
  const [lightboxUrl, setLightboxUrl] = useState(null);  // 灯箱里是哪张图，null = 关闭

  // 军规 1：当前猫咪不存 state，用 activeId 现场算出来
  const activeCat = cats.find(c => c.id === activeId);
  // 要显示的媒体也是算出来的：当前猫 + 当前类型，filter 一遍
  const visibleMedia = activeCat.media.filter(item => item.type === mediaType);

  // 保证同时只有一个视频在播：
  // 某个视频开始播放时（onPlay），遍历页面上所有 video，把不是它的全部暂停
  function handleVideoPlay(e) {
    const current = e.currentTarget;  // 刚被点击播放的那个 video 元素
    document.querySelectorAll('video').forEach(v => {
      if (v !== current) v.pause();
    });
  }

  return (
    <section style={{ marginTop: 40 }}>
      <h2>📷 相册</h2>

      {/* 第一级切换：哪只猫 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {cats.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            style={{
              padding: '6px 16px',
              borderRadius: 16,
              border: `1px solid ${colors.accent}`,
              cursor: 'pointer',
              // 当前选中的按钮高亮——样式也是数据的函数
              background: cat.id === activeId ? colors.accent : colors.cardBg,
              color: cat.id === activeId ? '#fff' : colors.accent,
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 第二级切换：照片 / 视频。括号里的数量也是现场算的 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {[
          { type: 'image', label: '照片' },
          { type: 'video', label: '视频' },
        ].map(tab => (
          <button
            key={tab.type}
            onClick={() => setMediaType(tab.type)}
            style={{
              padding: '4px 14px',
              borderRadius: 14,
              border: `1px solid ${colors.border}`,
              cursor: 'pointer',
              fontSize: 14,
              background: mediaType === tab.type ? colors.text : colors.cardBg,
              color: mediaType === tab.type ? '#fff' : colors.textSub,
            }}
          >
            {tab.label}（{activeCat.media.filter(m => m.type === tab.type).length}）
          </button>
        ))}
      </div>

      {/* 媒体网格：按 type 决定渲染 <img> 还是 <video> */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',  // 每行 4 个
        gap: 8,
        width: '80%',        // 内容区宽度的 4/5
        margin: '0 auto',    // 水平居中
      }}>
        {visibleMedia.length === 0 && (
          <p style={{ color: colors.textSub }}>还没有{mediaType === 'image' ? '照片' : '视频'}，敬请期待～</p>
        )}
        {visibleMedia.map(item =>
          item.type === 'image' ? (
            <img
              key={item.url}
              src={item.url}
              alt={`${activeCat.name}的照片`}
              onClick={() => setLightboxUrl(item.url)}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',   // 格子固定为正方形
                objectFit: 'cover',     // 图片填满格子，多余部分裁掉
                borderRadius: 8,
                cursor: 'zoom-in',
              }}
            />
          ) : (
            <video
              key={item.url}
              src={item.url}
              controls        // 浏览器自带的播放控件
              preload="metadata"  // 只预加载基本信息，不下载整个视频
              onPlay={handleVideoPlay}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          )
        )}
      </div>

      {/* 灯箱：lightboxUrl 不是 null 时才渲染 */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          style={{
            position: 'fixed',      // 脱离文档流，钉在屏幕上
            inset: 0,               // 上下左右都贴边 = 盖满全屏
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightboxUrl}
            alt="大图"
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 8 }}
          />
        </div>
      )}
    </section>
  );
}
