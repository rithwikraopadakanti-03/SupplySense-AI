from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_demand_forecast

router = APIRouter(prefix="/demand", tags=["Demand"])

class DemandForecast(BaseModel):
    date: str
    predicted_demand: int
    lower_bound: int
    upper_bound: int

@router.get("/forecast", response_model=List[DemandForecast])
async def demand_forecast():
    return get_demand_forecast()
