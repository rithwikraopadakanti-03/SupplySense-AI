from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class ShipmentStatus(str, enum.Enum):
    pending = "pending"
    in_transit = "in_transit"
    delayed = "delayed"
    delivered = "delivered"
    cancelled = "cancelled"
    at_customs = "at_customs"


class ShipmentMode(str, enum.Enum):
    air = "air"
    sea = "sea"
    road = "road"
    rail = "rail"


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    tracking_number = Column(String(100), unique=True, index=True, nullable=False)
    status = Column(Enum(ShipmentStatus), default=ShipmentStatus.pending)
    mode = Column(Enum(ShipmentMode), default=ShipmentMode.road)

    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=False)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=True)
    purchase_order_id = Column(Integer, ForeignKey("purchase_orders.id"), nullable=True)

    # Location
    origin_city = Column(String(100))
    origin_country = Column(String(100))
    destination_city = Column(String(100))
    destination_country = Column(String(100))
    current_lat = Column(Float)
    current_lng = Column(Float)
    current_location_name = Column(String(255))

    # Timing
    scheduled_departure = Column(DateTime)
    actual_departure = Column(DateTime)
    estimated_arrival = Column(DateTime)
    actual_arrival = Column(DateTime)
    delay_hours = Column(Float, default=0.0)

    # AI predictions
    delay_probability = Column(Float, default=0.0)  # 0-1
    delay_reason = Column(Text)
    weather_impact = Column(String(100))
    traffic_impact = Column(String(100))
    alternative_route = Column(Text)

    # Value
    total_weight_kg = Column(Float)
    total_value_usd = Column(Float)
    carrier = Column(String(255))
    notes = Column(Text)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    supplier = relationship("Supplier", back_populates="shipments")
    warehouse = relationship("Warehouse", back_populates="shipments")
    purchase_order = relationship("PurchaseOrder", back_populates="shipments")
