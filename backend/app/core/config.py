from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "SupplySense"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://supplysense_user:supplysense_pass@localhost:5432/supplysense"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # JWT
    SECRET_KEY: str = "your-super-secret-jwt-key-min-32-characters"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://frontend:3000",
    ]

    # AI
    GEMINI_API_KEY: str = ""
    USE_MOCK_AI: bool = True  # Set to False when real API key is provided

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

# Auto-detect if we should use real AI
if settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY) > 10:
    settings.USE_MOCK_AI = False
