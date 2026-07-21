import os
from typing import List


class Settings:
    APP_NAME: str = "SupplySense"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "production")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://supplysense_user:supplysense_pass@localhost:5432/supplysense"
    )

    SECRET_KEY: str = os.getenv("SECRET_KEY", "supplysense-secret-key-min-32-chars-long!!")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ALLOWED_ORIGINS: List[str] = ["*"]

    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    USE_MOCK_AI: bool = os.getenv("USE_MOCK_AI", "True").lower() == "true"


settings = Settings()

if settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY) > 10:
    settings.USE_MOCK_AI = False
