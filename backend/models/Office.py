import uuid

from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from AdminPanel.backend.models.User import User

from init import Base


class Office(Base):
    __tablename__ = "Office"
    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    name = Column(String)

    children = relationship("User")
