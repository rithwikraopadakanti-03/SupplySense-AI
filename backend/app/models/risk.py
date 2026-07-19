from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class RiskLevel(str, enum.Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"


class RiskEventType(str, enum.Enum):
    weather = "weather"
    political = "political"
    port_delay = "port_delay"
    strike = "strike"
    supplier_issue = "supplier_issue"
    flood = "flood"
    earthquake = "earthquake"
    pandemic = "pandemic"
    demand_spike = "demand_spike"
    price_surge = "price_surge"


class RiskEvent(Base):
    __tablename__ = "risk_events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    event_type = Column(Enum(RiskEventType))
    risk_level = Column(Enum(RiskLevel), default=RiskLevel.medium)
    risk_score = Column(Float, default=50.0)  # 0-100
    impact_level = Column(String(50))
    affected_regions = Column(JSON)  # list of strings
    affected_suppliers = Column(JSON)  # list of supplier IDs
    mitigation_strategy = Column(Text)
    ai_analysis = Column(Text)
    source = Column(String(255))  # news source, weather API, etc.
    is_active = Column(Integer, default=1)
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    message = Column(Text)
    alert_type = Column(String(100))  # inventory, shipment, risk, supplier
    severity = Column(Enum(RiskLevel), default=RiskLevel.medium)
    is_read = Column(Integer, default=0)
    related_entity_type = Column(String(100))
    related_entity_id = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(500))
    message = Column(Text)
    notification_type = Column(String(100))
    is_read = Column(Integer, default=0)
    metadata = Column(JSON)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="notifications")
