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
