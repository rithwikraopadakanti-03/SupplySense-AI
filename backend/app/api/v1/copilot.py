from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_copilot_response, get_copilot_history

router = APIRouter(prefix="/copilot", tags=["Copilot"])

class ChatRequest(BaseModel):
    query: str

class ChatMessage(BaseModel):
    role: str
    content: str

@router.post("/chat")
async def copilot_chat(req: ChatRequest):
    response = get_copilot_response(req.query)
    return {"response": response}

@router.get("/history", response_model=List[ChatMessage])
async def copilot_history():
    return get_copilot_history()
