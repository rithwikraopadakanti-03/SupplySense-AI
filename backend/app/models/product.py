from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class ProductCategory(str, enum.Enum):
    electronics = "electronics"
    apparel = "apparel"
    food = "food"
    pharmaceutical = "pharmaceutical"
    automotive = "automotive"
    industrial = "industrial"
    consumer_goods = "consumer_goods"


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(Enum(ProductCategory), default=ProductCategory.consumer_goods)
    unit = Column(String(50), default="units")
    unit_cost = Column(Float, nullable=False, default=0.0)
    selling_price = Column(Float, nullable=False, default=0.0)
    weight_kg = Column(Float, default=0.0)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    image_url = Column(String(512))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    supplier = relationship("Supplier", back_populates="products")
    company = relationship("Company", back_populates="products")
    inventory = relationship("Inventory", back_populates="product")
    forecasts = relationship("Forecast", back_populates="product")
