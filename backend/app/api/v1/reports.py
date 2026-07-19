from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/reports", tags=["Reports"])

class ReportRequest(BaseModel):
    type: str
    date_range: str

class ReportInfo(BaseModel):
    id: str
    name: str
    generated_at: str
    status: str

@router.post("/generate")
async def generate_report(req: ReportRequest):
    return {"message": f"Report of type {req.type} is being generated."}

@router.get("/", response_model=List[ReportInfo])
async def list_reports():
    return [
        {"id": "RPT-001", "name": "Monthly Performance", "generated_at": "2023-10-01T12:00:00Z", "status": "Ready"},
        {"id": "RPT-002", "name": "Supplier Risk Analysis", "generated_at": "2023-10-05T15:30:00Z", "status": "Ready"}
    ]
