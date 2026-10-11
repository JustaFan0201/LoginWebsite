import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Default = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  // 升級後的現代化樣式
  const styles = {
    page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, sans-serif' },
    card: { padding: '48px 40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', textAlign: 'center', maxWidth: '400px', width: '100%', boxSizing: 'border-box' },
    icon: { fontSize: '48px', marginBottom: '16px', display: 'block' },
    title: { margin: '0 0 12px 0', color: '#111827', fontSize: '28px', fontWeight: 'bold' },
    text: { margin: '0 0 32px 0', color: '#4b5563', fontSize: '16px', lineHeight: '1.5' },
    highlight: { color: '#2563eb', fontWeight: 'bold', fontSize: '18px' },
    button: { padding: '12px 24px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', width: '100%', transition: 'background-color 0.2s' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <span style={styles.icon}>👋</span>
        <h2 style={styles.title}>登入成功！</h2>
        <p style={styles.text}>
          歡迎回來，<br/>
          <span style={styles.highlight}>{user}</span>
        </p>
        
        <button onClick={handleLogout} style={styles.button}>
          安全登出
        </button>
      </div>
    </div>
  );
};

export default Default;