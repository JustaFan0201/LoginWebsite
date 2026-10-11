from flask import Blueprint, request, jsonify, make_response
from pydantic import ValidationError
from jose import jwt, JWTError

import config
from database import database, models
from models import user
from utils import security
from utils.rate_limit import limiter

user_bp = Blueprint("user_router", __name__)

@user_bp.route("/api/register", methods=["POST"])
def register():
    try:
        user_data = user.UserCreate(**request.json)
    except ValidationError as e:
        first_error = e.errors()[0]
        field_name = first_error.get("loc")[0]
    
        error_msg = first_error.get("msg")
        
        if field_name in user.UserCreate.model_fields:
            desc = user.UserCreate.model_fields[field_name].description
            if desc:
                error_msg = desc
            
        return jsonify({"detail": error_msg}), 422
    db = database.SessionLocal()
    try:
        db_user = db.query(models.User).filter(models.User.username == user_data.username).first()
        if db_user:
            return jsonify({"detail": "此帳號已被註冊"}), 400
        
        hashed_pwd = security.get_password_hash(user_data.password)
        new_user = models.User(username=user_data.username, password=hashed_pwd)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return jsonify({"id": new_user.id, "username": new_user.username}), 201
    finally:
        db.close()

@user_bp.route("/api/login", methods=["POST"])
@limiter.limit("5 per 15 minute") # 限制同一 IP 15 分鐘內只能嘗試 5 次
def login():
    try:
        user_data = user.UserCreate(**request.json)
    except ValidationError as e:
        return jsonify({"detail": e.errors()}), 422

    db = database.SessionLocal()
    try:
        db_user = db.query(models.User).filter(models.User.username == user_data.username).first()
        
        if not db_user or not security.verify_password(user_data.password, db_user.password):
            return jsonify({"detail": "帳號或密碼錯誤"}), 401
            
        access_token = security.create_access_token(data={"sub": db_user.username})
        
        response = make_response(jsonify({"message": "登入成功", "username": db_user.username}))
        response.set_cookie(
            "access_token", 
            value=access_token, 
            httponly=True,   
            samesite="Lax",  
            max_age=config.ACCESS_TOKEN_EXPIRE_MINUTES * 60  
        )
        return response, 200
    finally:
        db.close()

@user_bp.route("/api/me", methods=["GET"])
def get_current_user():
    token = request.cookies.get("access_token")
    if not token:
        return jsonify({"detail": "未授權，請先登入"}), 401
    
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return jsonify({"detail": "無效的憑證"}), 401
        return jsonify({"username": username}), 200
    except JWTError:
        return jsonify({"detail": "憑證已過期或無效"}), 401

@user_bp.route("/api/logout", methods=["POST"])
def logout():
    response = make_response(jsonify({"message": "已成功登出"}))
    response.set_cookie("access_token", "", expires=0)
    return response, 200