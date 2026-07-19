from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_risk_events, get_risk_score

router = APIRouter(prefix="/risk", tags=["Risk"])

class RiskEvent(BaseModel):
    id: str
    type: str
    severity: str
    description: str
    affected_shipments: List[str]

@router.get("/events", response_model=List[RiskEvent])
async def risk_events():
    return get_risk_events()

@router.get("/score")
async def risk_score():
    return get_risk_score()
