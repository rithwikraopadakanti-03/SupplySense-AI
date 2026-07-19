from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_inventory_data, get_inventory_summary

router = APIRouter(prefix="/inventory", tags=["Inventory"])

class InventoryItem(BaseModel):
    id: str
    name: str
    category: str
    stock_level: int
    reorder_point: int
    warehouse: str
    status: str

@router.get("/", response_model=List[InventoryItem])
async def list_inventory(skip: int = 0, limit: int = 10):
    data = get_inventory_data()
    return data[skip : skip + limit]

@router.get("/summary")
async def inventory_summary():
    return get_inventory_summary()
