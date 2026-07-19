from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup — try DB init but don't crash if unavailable (demo mode)
    try:
        from app.core.database import engine, Base, _db_available
        if _db_available and engine is not None:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("[SupplySense] Database tables created.")
        else:
            print("[SupplySense] Running in DEMO MODE (no database — using mock data).")
    except Exception as e:
        print(f"[SupplySense] DB startup skipped: {e} — Running in DEMO MODE.")

    yield

    # Shutdown
    try:
        from app.core.database import engine
        if engine is not None:
            await engine.dispose()
    except Exception:
        pass


app = FastAPI(
    title="SupplySense API",
    description="AI Supply Chain Risk & Inventory Intelligence Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # permissive for hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    from app.core.database import _db_available
    return {
        "status": "ok",
        "service": "SupplySense API",
        "version": "1.0.0",
        "mode": "live" if _db_available else "demo (mock data)",
    }
