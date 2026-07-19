from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)

    # Location
    address = Column(Text)
    city = Column(String(100))
    country = Column(String(100))
    lat = Column(Float)
    lng = Column(Float)

    # Capacity
    total_capacity_sqft = Column(Float, default=100000.0)
    current_utilization_pct = Column(Float, default=75.0)
    max_weight_tons = Column(Float, default=5000.0)

    # Operations
    incoming_trucks_today = Column(Integer, default=0)
    outgoing_trucks_today = Column(Integer, default=0)
    workers_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # AI fields
    efficiency_score = Column(Float, default=82.0)
    ai_recommendations = Column(Text)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    company = relationship("Company", back_populates="warehouses")
    inventory = relationship("Inventory", back_populates="warehouse")
    shipments = relationship("Shipment", back_populates="warehouse")


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)

    current_stock = Column(Integer, default=0)
    reserved_stock = Column(Integer, default=0)
    incoming_stock = Column(Integer, default=0)
    outgoing_stock = Column(Integer, default=0)
    safety_stock = Column(Integer, default=0)
    reorder_point = Column(Integer, default=0)
    days_remaining = Column(Float, default=0.0)

    # AI fields
    ai_recommendation = Column(Text)
    ai_action = Column(String(255))  # "ORDER", "TRANSFER", "REDUCE"
    ai_quantity_recommended = Column(Integer, default=0)

    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())

    product = relationship("Product", back_populates="inventory")
    warehouse = relationship("Warehouse", back_populates="inventory")
