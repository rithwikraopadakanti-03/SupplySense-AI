from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_alerts

router = APIRouter(prefix="/alerts", tags=["Alerts"])

class Alert(BaseModel):
    id: str
    title: str
    message: str
    severity: str
    read: bool
    timestamp: str

@router.get("/", response_model=List[Alert])
async def list_alerts():
    return get_alerts()

@router.put("/{id}/read")
async def mark_alert_read(id: str):
    return {"message": f"Alert {id} marked as read"}
