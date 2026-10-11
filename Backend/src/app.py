from flask import Flask, jsonify
from flask_cors import CORS

from database import database, models
from utils.rate_limit import limiter
from routers.user_router import user_bp

models.Base.metadata.create_all(bind=database.engine)

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:5173"}})
limiter.init_app(app)
@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({"detail": "登入嘗試次數過多，請於 15 分鐘後再試。"}), 429

app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)