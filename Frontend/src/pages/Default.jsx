import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Default = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;
  useEffect(() => {
    // 進入首頁時，自動向後端驗證是否已登入
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/me');
        setUsername(response.data.username);
      } catch (err) {
        console.error("驗證失敗:", err);
        alert('請先登入！');
        navigate('/'); // 驗證失敗就趕回登入頁
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      navigate('/');
    } catch (err) {
      console.error("登出失敗:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>登入成功！</h1>
      <p>歡迎回來，{username}！</p>
      <button 
        onClick={handleLogout}
        style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        登出
      </button>
    </div>
  );
};

export default Default;