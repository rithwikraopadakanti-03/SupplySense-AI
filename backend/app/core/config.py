import os
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "SupplySense"
    ENVIRONMENT: str = "production"
    DEBUG: bool = False

    DATABASE_URL: str = "postgresql://user:pass@localhost:5432/supplysense"

    SECRET_KEY: str = "supplysense-secret-key-min-32-chars-long!!"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ALLOWED_ORIGINS: List[str] = ["*"]

    GEMINI_API_KEY: str = ""
    USE_MOCK_AI: bool = True

    model_config = {"env_file": ".env", "case_sensitive": True}


settings = Settings()

if settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY) > 10:
    settings.USE_MOCK_AI = False
