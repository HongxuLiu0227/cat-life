// 主页：两只猫的资料卡
import { cats } from '../data/cats.js';
import CatCard from '../components/CatCard.jsx';

export default function Home() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 48 }}>
      {cats.map(cat => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
}
