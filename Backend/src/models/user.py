from pydantic import BaseModel, Field, ConfigDict

class UserCreate(BaseModel):
    username: str = Field(..., min_length=4, max_length=50, description="帳號長度需介於4到50字元")
    password: str = Field(..., min_length=4, max_length=50, description="密碼長度需介於4到50字元")

class UserResponse(BaseModel):
    id: int
    username: str
    model_config = ConfigDict(from_attributes=True)