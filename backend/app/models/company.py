from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    industry = Column(String(100))
    country = Column(String(100))
    logo_url = Column(String(512))
    subscription_plan = Column(String(50), default="enterprise")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

    users = relationship("User", back_populates="company")
    warehouses = relationship("Warehouse", back_populates="company")
    suppliers = relationship("Supplier", back_populates="company")
    products = relationship("Product", back_populates="company")
