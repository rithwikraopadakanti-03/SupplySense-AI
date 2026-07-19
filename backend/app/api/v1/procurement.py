from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_procurement_recommendations

router = APIRouter(prefix="/procurement", tags=["Procurement"])

class ProcurementRec(BaseModel):
    item_id: str
    action: str
    quantity: int
    reason: str
    suggested_supplier: str

@router.get("/recommendations", response_model=List[ProcurementRec])
async def procurement_recommendations():
    return get_procurement_recommendations()
