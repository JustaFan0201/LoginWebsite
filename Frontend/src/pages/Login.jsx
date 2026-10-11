import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('帳號與密碼不能為空');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (username === 'admin' && password === 'SecurePass123!') {
        localStorage.setItem('loggedInUser', username);
        navigate('/default');
      } else {
        setError('帳號或密碼錯誤，請重試。');
      }
      setIsLoading(false);
    }, 1000);
  };

  // 升級後的現代化樣式
  const styles = {
    page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, sans-serif' },
    card: { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '380px', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', boxSizing: 'border-box' },
    header: { textAlign: 'center', marginBottom: '32px' },
    title: { margin: '0 0 8px 0', color: '#111827', fontSize: '24px', fontWeight: 'bold' },
    subtitle: { margin: 0, color: '#6b7280', fontSize: '14px' },
    formGroup: { display: 'flex', flexDirection: 'column', marginBottom: '20px' },
    label: { marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' },
    input: { padding: '12px 16px', fontSize: '15px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', backgroundColor: '#f9fafb', color: '#111827' },
    button: { marginTop: '10px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', backgroundColor: isLoading ? '#9ca3af' : '#2563eb', color: 'white', border: 'none', borderRadius: '8px', transition: 'background-color 0.2s' },
    errorBox: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #f87171' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>系統登入</h2>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          {error && <div style={styles.errorBox}>{error}</div>}
          
          <div style={styles.formGroup}>
            <label style={styles.label}>帳號</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="輸入 admin" 
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>密碼</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="輸入 SecurePass123!" 
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? '驗證中...' : '登入'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;