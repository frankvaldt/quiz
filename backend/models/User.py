from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from AdminPanel.backend.models.Score import Score

from init import Base


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    id_telegram = Column(Integer)
    name = Column(String)
    office_id = Column(Integer, ForeignKey("Office.id"))
    children = relationship("Score")
