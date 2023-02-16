from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from AdminPanel.backend.models.User import User

from init import Base


class Office(Base):
    __tablename__ = "Office"
    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    name = Column(String)

    children = relationship("User")
