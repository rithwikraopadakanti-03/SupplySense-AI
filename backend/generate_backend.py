import os
import pathlib

base_dir = pathlib.Path(r"c:\Users\P.Rithwik Rao\OneDrive\Documents\Agentic_AI\supplysense\backend")

files = {
    "app/services/__init__.py": "",
    "app/api/__init__.py": "",
    "app/api/v1/__init__.py": "",
    "app/services/mock_data.py": """
import random
from datetime import datetime, timedelta

def get_dashboard_data():
    return {
        "supply_chain_health_score": 87,
        "inventory_status": "Healthy",
        "supplier_reliability": "Good",
        "delayed_shipments_count": 3,
        "warehouse_capacity_pct": 72,
        "demand_forecast_trend": "+5.4%",
        "critical_alerts_count": 2,
        "risk_score": 15,
        "ai_summary": "Supply chain operations are running smoothly with an overall health score of 87. Inventory levels are stable, although there are minor delays in 3 shipments originating from Southeast Asia due to port congestion. Demand for electronics is expected to increase by 5.4% next month.",
        "today_recommendations": [
            "Reorder 500 units of Product A to avoid stockout at Warehouse 1.",
            "Contact Supplier TechCorp regarding delayed Shipment #SHP-104.",
            "Optimize inventory routing for Midwest distribution."
        ]
    }

def get_inventory_data():
    products = []
    for i in range(1, 21):
        products.append({
            "id": f"PRD-{1000+i}",
            "name": f"Product {chr(64+i)}",
            "category": random.choice(["Electronics", "Apparel", "Home Goods", "Industrial"]),
            "stock_level": random.randint(50, 1000),
            "reorder_point": random.randint(100, 200),
            "warehouse": f"Warehouse {random.randint(1,5)}",
            "status": random.choice(["In Stock", "Low Stock", "Out of Stock"])
        })
    return products

def get_inventory_summary():
    return {
        "total_items": 15400,
        "total_value": 450000.00,
        "low_stock_items": 12,
        "out_of_stock_items": 2
    }

def get_suppliers_data():
    suppliers = []
    names = ["TechCorp", "GlobalSupplies", "FastLogistics", "Apex Materials", "Pioneer Goods",
             "Quantum Components", "Titan Manufacturing", "Nexus Trade", "Stellar Sourcing",
             "Summit Supply", "Evergreen Imports", "Horizon Exports", "Metro Logistics",
             "EcoPackaging", "Advanced Circuits"]
    for i, name in enumerate(names):
        suppliers.append({
            "id": f"SUP-{100+i}",
            "name": name,
            "country": random.choice(["USA", "China", "Germany", "Japan", "India"]),
            "reliability_score": random.randint(70, 99),
            "lead_time_days": random.randint(5, 30),
            "active_orders": random.randint(1, 15)
        })
    return suppliers

def get_supplier_ai_analysis(supplier_id: str):
    return {
        "supplier_id": supplier_id,
        "analysis": "This supplier has maintained a high reliability score over the past year. However, recent weather events in their primary manufacturing region have caused a slight increase in lead times. It is recommended to diversify sourcing for critical components over the next quarter to mitigate potential risks."
    }

def get_shipments_data():
    shipments = []
    for i in range(1, 31):
        shipments.append({
            "id": f"SHP-{5000+i}",
            "origin": random.choice(["Shanghai", "Los Angeles", "Hamburg", "Mumbai", "Tokyo"]),
            "destination": random.choice(["New York", "London", "Berlin", "Sydney", "Toronto"]),
            "status": random.choice(["In Transit", "Delayed", "Delivered", "Customs"]),
            "eta": (datetime.now() + timedelta(days=random.randint(1, 15))).strftime("%Y-%m-%d"),
            "carrier": random.choice(["FedEx", "UPS", "Maersk", "DHL"])
        })
    return shipments

def get_shipment_details(shipment_id: str):
    return {
        "id": shipment_id,
        "status": "In Transit",
        "origin": "Shanghai",
        "destination": "New York",
        "current_location": "Pacific Ocean",
        "coordinates": {"lat": 35.0, "lng": -150.0},
        "temperature_celsius": 22.5,
        "humidity_pct": 55,
        "last_update": datetime.now().isoformat()
    }

def get_warehouses_data():
    return [
        {"id": "WH-1", "name": "East Coast Hub", "location": "New York, USA", "capacity_pct": 85},
        {"id": "WH-2", "name": "West Coast Hub", "location": "Los Angeles, USA", "capacity_pct": 60},
        {"id": "WH-3", "name": "European Dist", "location": "Berlin, Germany", "capacity_pct": 75},
        {"id": "WH-4", "name": "Asia Dist", "location": "Shanghai, China", "capacity_pct": 90},
        {"id": "WH-5", "name": "South America Dist", "location": "Sao Paulo, Brazil", "capacity_pct": 45},
    ]

def get_warehouse_heatmap(warehouse_id: str):
    return {
        "warehouse_id": warehouse_id,
        "zones": [
            {"zone": "A", "utilization": 90, "status": "High Traffic"},
            {"zone": "B", "utilization": 60, "status": "Normal"},
            {"zone": "C", "utilization": 40, "status": "Low Traffic"}
        ]
    }

def get_demand_forecast():
    forecast = []
    base = datetime.now()
    for i in range(30):
        date_str = (base + timedelta(days=i)).strftime("%Y-%m-%d")
        predicted = random.randint(1000, 1500)
        forecast.append({
            "date": date_str,
            "predicted_demand": predicted,
            "lower_bound": int(predicted * 0.9),
            "upper_bound": int(predicted * 1.1)
        })
    return forecast

def get_risk_events():
    return [
        {"id": "RSK-1", "type": "Weather", "severity": "High", "description": "Hurricane approaching East Coast. May disrupt port operations.", "affected_shipments": ["SHP-5001", "SHP-5002"]},
        {"id": "RSK-2", "type": "Geopolitical", "severity": "Medium", "description": "New tariffs announced affecting imports from Region X.", "affected_shipments": []},
        {"id": "RSK-3", "type": "Supplier", "severity": "Low", "description": "Supplier TechCorp reported minor production delays.", "affected_shipments": ["SHP-5005"]}
    ]

def get_risk_score():
    return {"overall_risk_score": 24, "trend": "Decreasing", "level": "Low-Medium"}

def get_procurement_recommendations():
    return [
        {"item_id": "PRD-1001", "action": "Reorder", "quantity": 500, "reason": "Approaching low stock point.", "suggested_supplier": "SUP-100"},
        {"item_id": "PRD-1005", "action": "Expedite", "quantity": 200, "reason": "Unexpected demand spike detected.", "suggested_supplier": "SUP-101"}
    ]

def get_copilot_response(query: str):
    return f"AI Analysis for: '{query}'. Based on current supply chain data, inventory levels are stable but you should monitor the upcoming hurricane which may affect 2 shipments. I recommend expediting orders for critical components from Supplier TechCorp."

def get_copilot_history():
    return [
        {"role": "user", "content": "How are our shipments doing?"},
        {"role": "assistant", "content": "Most shipments are on time, but 3 are delayed due to port congestion."}
    ]

def get_alerts():
    return [
        {"id": "ALT-1", "title": "Low Stock Alert", "message": "Product A is running low in Warehouse 1.", "severity": "Warning", "read": False, "timestamp": datetime.now().isoformat()},
        {"id": "ALT-2", "title": "Shipment Delayed", "message": "Shipment SHP-5003 is delayed by 3 days.", "severity": "Error", "read": False, "timestamp": datetime.now().isoformat()}
    ]

def get_analytics_kpis():
    return {
        "on_time_delivery_rate": 92.5,
        "inventory_turnover_ratio": 6.8,
        "perfect_order_rate": 88.4,
        "cash_to_cash_cycle_days": 45
    }

def get_analytics_supplier_performance():
    return [
        {"supplier": "TechCorp", "on_time_rate": 95, "defect_rate": 0.5},
        {"supplier": "GlobalSupplies", "on_time_rate": 85, "defect_rate": 1.2}
    ]

def get_analytics_forecast_accuracy():
    return {"mape": 12.5, "bias": -2.1, "accuracy_score": 87.5}
""",
    "app/api/v1/auth.py": """
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Auth"])

class AuthRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=AuthResponse)
async def login(data: AuthRequest):
    return {"access_token": "mock_jwt_token_123", "token_type": "bearer"}

@router.post("/signup", response_model=AuthResponse)
async def signup(data: AuthRequest):
    return {"access_token": "mock_jwt_token_123", "token_type": "bearer"}

@router.post("/refresh")
async def refresh():
    return {"access_token": "mock_new_jwt_token_456", "token_type": "bearer"}

@router.post("/logout")
async def logout():
    return {"message": "Successfully logged out"}

@router.post("/forgot-password")
async def forgot_password(email: str):
    return {"message": "Password reset email sent"}

@router.post("/verify-otp")
async def verify_otp(email: str, otp: str):
    return {"message": "OTP verified successfully"}
""",
    "app/api/v1/dashboard.py": """
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.mock_data import get_dashboard_data

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

class DashboardOverview(BaseModel):
    supply_chain_health_score: int
    inventory_status: str
    supplier_reliability: str
    delayed_shipments_count: int
    warehouse_capacity_pct: int
    demand_forecast_trend: str
    critical_alerts_count: int
    risk_score: int
    ai_summary: str
    today_recommendations: List[str]

@router.get("/overview", response_model=DashboardOverview)
async def get_overview():
    return get_dashboard_data()
""",
    "app/api/v1/inventory.py": """
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
""",
    "app/api/v1/suppliers.py": """
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
""",
    "app/api/v1/shipments.py": """
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
""",
    "app/api/v1/warehouses.py": """
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
""",
    "app/api/v1/demand.py": """
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
""",
    "app/api/v1/risk.py": """
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
""",
    "app/api/v1/procurement.py": """
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
""",
    "app/api/v1/copilot.py": """
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
""",
    "app/api/v1/reports.py": """
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
""",
    "app/api/v1/alerts.py": """
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
""",
    "app/api/v1/analytics.py": """
from fastapi import APIRouter
from app.services.mock_data import get_analytics_kpis, get_analytics_supplier_performance, get_analytics_forecast_accuracy

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/kpis")
async def analytics_kpis():
    return get_analytics_kpis()

@router.get("/supplier-performance")
async def analytics_supplier_performance():
    return get_analytics_supplier_performance()

@router.get("/forecast-accuracy")
async def analytics_forecast_accuracy():
    return get_analytics_forecast_accuracy()
""",
    "app/api/v1/router.py": """
from fastapi import APIRouter
from app.api.v1 import auth, dashboard, inventory, suppliers, shipments, warehouses, demand, risk, procurement, copilot, reports, alerts, analytics

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(dashboard.router)
api_router.include_router(inventory.router)
api_router.include_router(suppliers.router)
api_router.include_router(shipments.router)
api_router.include_router(warehouses.router)
api_router.include_router(demand.router)
api_router.include_router(risk.router)
api_router.include_router(procurement.router)
api_router.include_router(copilot.router)
api_router.include_router(reports.router)
api_router.include_router(alerts.router)
api_router.include_router(analytics.router)
"""
}

for file_path, content in files.items():
    full_path = base_dir / file_path
    full_path.parent.mkdir(parents=True, exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\\n")
    print(f"Created {full_path}")
