from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_warehouses_data, get_warehouse_heatmap

router = APIRouter(prefix="/warehouses", tags=["Warehouses"])

class Warehouse(BaseModel):
    id: str
    name: str
    location: str
    capacity_pct: int

@router.get("/", response_model=List[Warehouse])
async def list_warehouses():
    return get_warehouses_data()

@router.get("/{id}/heatmap")
async def warehouse_heatmap(id: str):
    return get_warehouse_heatmap(id)
