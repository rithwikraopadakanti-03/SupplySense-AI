from fastapi import APIRouter
from app.services.mock_data import get_analytics_kpis, get_analytics_supplier_performance, get_analytics_forecast_accuracy

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/kpis")
async def analytics_kpis():
    return get_analytics_kpis()

@router.get("/supplier-performance")
async def analytics_supplier_performance():
    return get_analytics_supplier_performance()

@router.get("/forecast-accuracy")
async def analytics_forecast_accuracy():
    return get_analytics_forecast_accuracy()
