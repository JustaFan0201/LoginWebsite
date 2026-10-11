import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.get('/api/me');
        navigate('/default');
      } catch (err) {
        console.log("需要重新登入"); 
      }
    };
    checkExistingSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('帳號與密碼不能為空');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isRegisterMode) {
        await axios.post('/api/register', {
          username: username,
          password: password
        });
        alert('註冊成功！請使用新帳號登入。');
        setIsRegisterMode(false);
        setPassword('');
      } else {
        const response = await axios.post('/api/login', {
          username: username,
          password: password
        });
        navigate('/default');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const errorDetail = err.response.data.detail;
        if (Array.isArray(errorDetail)) {
          setError(errorDetail[0].msg || '輸入格式錯誤');
        } else {
          setError(errorDetail);
        }
      } else {
        setError('伺服器連線失敗，請確認後端已啟動。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, sans-serif' },
    card: { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '380px', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', boxSizing: 'border-box' },
    header: { textAlign: 'center', marginBottom: '32px' },
    title: { margin: '0 0 8px 0', color: '#111827', fontSize: '24px', fontWeight: 'bold' },
    subtitle: { margin: 0, color: '#6b7280', fontSize: '14px' },
    formGroup: { display: 'flex', flexDirection: 'column', marginBottom: '20px' },
    label: { marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' },
    input: { padding: '12px 16px', fontSize: '15px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', backgroundColor: '#f9fafb' },
    button: { marginTop: '10px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', backgroundColor: isLoading ? '#9ca3af' : '#2563eb', color: 'white', border: 'none', borderRadius: '8px', transition: 'background-color 0.2s' },
    errorBox: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #f87171' },
    toggleText: { marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#4b5563' },
    toggleLink: { color: '#2563eb', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{isRegisterMode ? '建立新帳號' : '系統登入'}</h2>
          <p style={styles.subtitle}>請輸入您的帳號密碼以繼續</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {error && <div style={styles.errorBox}>{error}</div>}
          
          <div style={styles.formGroup}>
            <label style={styles.label}>帳號</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={styles.input}
              maxLength={50}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>密碼</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input}
              maxLength={50}
            />
          </div>

          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? '處理中...' : (isRegisterMode ? '註冊' : '登入')}
          </button>
        </form>

        <div style={styles.toggleText}>
          {isRegisterMode ? '已有帳號？ ' : '還沒有帳號？ '}
          <span style={styles.toggleLink} onClick={() => { setIsRegisterMode(!isRegisterMode); setError(''); }}>
            {isRegisterMode ? '立即登入' : '點此註冊'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;