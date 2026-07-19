from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class SupplierStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    at_risk = "at_risk"
    blacklisted = "blacklisted"


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    contact_email = Column(String(255))
    contact_phone = Column(String(50))
    country = Column(String(100))
    city = Column(String(100))
    address = Column(Text)
    status = Column(Enum(SupplierStatus), default=SupplierStatus.active)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)

    # Scores
    reliability_score = Column(Float, default=85.0)  # 0-100
    quality_rating = Column(Float, default=4.0)      # 0-5
    on_time_delivery_pct = Column(Float, default=88.0)
    average_lead_time_days = Column(Integer, default=14)
    average_delay_days = Column(Float, default=2.0)
    late_shipments_count = Column(Integer, default=0)
    total_shipments = Column(Integer, default=0)
    risk_score = Column(Float, default=25.0)         # 0-100, higher = riskier

    # AI fields
    ai_explanation = Column(Text)
    ai_last_updated = Column(DateTime)

    website = Column(String(255))
    logo_url = Column(String(512))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    company = relationship("Company", back_populates="suppliers")
    products = relationship("Product", back_populates="supplier")
    shipments = relationship("Shipment", back_populates="supplier")
    purchase_orders = relationship("PurchaseOrder", back_populates="supplier")
