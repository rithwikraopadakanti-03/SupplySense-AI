from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Auth"])

class AuthRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=AuthResponse)
async def login(data: AuthRequest):
    return {"access_token": "mock_jwt_token_123", "token_type": "bearer"}

@router.post("/signup", response_model=AuthResponse)
async def signup(data: AuthRequest):
    return {"access_token": "mock_jwt_token_123", "token_type": "bearer"}

@router.post("/refresh")
async def refresh():
    return {"access_token": "mock_new_jwt_token_456", "token_type": "bearer"}

@router.post("/logout")
async def logout():
    return {"message": "Successfully logged out"}

@router.post("/forgot-password")
async def forgot_password(email: str):
    return {"message": "Password reset email sent"}

@router.post("/verify-otp")
async def verify_otp(email: str, otp: str):
    return {"message": "OTP verified successfully"}
