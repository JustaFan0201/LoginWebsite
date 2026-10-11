import os
from pathlib import Path
from dotenv import load_dotenv

# 取得 Backend 目錄的絕對路徑
BASE_DIR = Path(__file__).resolve().parent

# 載入 .env 檔案
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# 資料庫設定
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("環境變數中找不到 DATABASE_URL，請確認 .env 檔案")

# JWT 安全設定
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 15))