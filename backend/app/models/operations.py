from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class POStatus(str, enum.Enum):
    draft = "draft"
    pending = "pending"
    approved = "approved"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True, index=True)
    po_number = Column(String(100), unique=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=False)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    status = Column(Enum(POStatus), default=POStatus.draft)

    quantity = Column(Integer, nullable=False)
    unit_cost = Column(Float, nullable=False)
    total_cost = Column(Float, nullable=False)
    expected_delivery_date = Column(DateTime)
    ai_recommended = Column(Boolean, default=False)
    ai_reasoning = Column(Text)
    estimated_savings = Column(Float, default=0.0)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    supplier = relationship("Supplier", back_populates="purchase_orders")
    shipments = relationship("Shipment", back_populates="purchase_order")


class Forecast(Base):
    __tablename__ = "forecasts"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    forecast_date = Column(DateTime, nullable=False)
    predicted_demand = Column(Float, nullable=False)
    confidence_lower = Column(Float)
    confidence_upper = Column(Float)
    confidence_score = Column(Float, default=0.85)
    seasonality_factor = Column(Float, default=1.0)
    festival_boost = Column(Boolean, default=False)
    promotion_boost = Column(Boolean, default=False)
    model_version = Column(String(50), default="v1.0")
    created_at = Column(DateTime, server_default=func.now())

    product = relationship("Product", back_populates="forecasts")


class AIReport(Base):
    __tablename__ = "ai_reports"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500))
    report_type = Column(String(100))  # daily, weekly, monthly, custom
    content_json = Column(JSON)
    pdf_url = Column(String(512))
    generated_by_user_id = Column(Integer, ForeignKey("users.id"))
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(String(50))  # user, assistant
    content = Column(Text, nullable=False)
    context_used = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="chat_history")
