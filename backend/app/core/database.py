"""
Database module — optional PostgreSQL connection.
The server starts fine without a database; all endpoints use mock_data.py in demo mode.
"""
import os
from sqlalchemy.orm import DeclarativeBase

# Only import async engine if asyncpg is available
_db_available = False
engine = None
AsyncSessionLocal = None

try:
    from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
    from app.core.config import settings

    if settings.DATABASE_URL and "postgresql" in settings.DATABASE_URL:
        engine = create_async_engine(
            settings.DATABASE_URL,
            echo=getattr(settings, "DEBUG", False),
            pool_pre_ping=True,
            pool_size=5,
            max_overflow=10,
        )
        AsyncSessionLocal = async_sessionmaker(
            engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False,
        )
        _db_available = True
except Exception as e:
    print(f"[SupplySense] Database not available (demo mode): {e}")


class Base(DeclarativeBase):
    pass


async def get_db():
    """Dependency — yields a DB session if available, otherwise yields None (mock mode)."""
    if AsyncSessionLocal is None:
        yield None
        return
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


def is_db_available() -> bool:
    return _db_available
