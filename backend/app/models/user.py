from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class UserRole(str, enum.Enum):
    admin = "admin"
    executive = "executive"
    analyst = "analyst"
    viewer = "viewer"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.analyst)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    otp_code = Column(String(10), nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    avatar_url = Column(String(512), nullable=True)
    last_login = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    company = relationship("Company", back_populates="users")
    chat_history = relationship("ChatHistory", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
