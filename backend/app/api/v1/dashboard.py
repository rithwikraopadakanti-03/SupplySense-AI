from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_dashboard_data

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

class DashboardOverview(BaseModel):
    supply_chain_health_score: int
    inventory_status: str
    supplier_reliability: str
    delayed_shipments_count: int
    warehouse_capacity_pct: int
    demand_forecast_trend: str
    critical_alerts_count: int
    risk_score: int
    ai_summary: str
    today_recommendations: List[str]

@router.get("/overview", response_model=DashboardOverview)
async def get_overview():
    return get_dashboard_data()
