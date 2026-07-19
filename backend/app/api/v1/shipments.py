from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_shipments_data, get_shipment_details

router = APIRouter(prefix="/shipments", tags=["Shipments"])

class Shipment(BaseModel):
    id: str
    origin: str
    destination: str
    status: str
    eta: str
    carrier: str

@router.get("/", response_model=List[Shipment])
async def list_shipments():
    return get_shipments_data()

@router.get("/{id}")
async def shipment_details(id: str):
    return get_shipment_details(id)
