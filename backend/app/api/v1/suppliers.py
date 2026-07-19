from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_suppliers_data, get_supplier_ai_analysis

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])

class Supplier(BaseModel):
    id: str
    name: str
    country: str
    reliability_score: int
    lead_time_days: int
    active_orders: int

@router.get("/", response_model=List[Supplier])
async def list_suppliers():
    return get_suppliers_data()

@router.get("/{id}/ai-analysis")
async def supplier_ai_analysis(id: str):
    return get_supplier_ai_analysis(id)
