## Backend Setup

**系統要求：**
- Python 3.9 或以上版本
- PostgreSQL 資料庫

### 安裝套件
```bash
cd Backend
setup.ps1
```
### .env設定
```
# 資料庫連線設定 (請替換為自己的密碼與資料庫名稱)
DATABASE_URL="postgresql://postgres:您的密碼@localhost/DB名稱"

# JWT Token 授權設定
SECRET_KEY="your-very-secure-secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=15
```

### 啟動後端
```bash
cd Backend
.\venv\Scripts\Activate.ps1
python src/app.py
```