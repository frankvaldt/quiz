import uuid

from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.models.Score import Score
from backend.models.ScoreTime import ScoreTime

from backend.init import Base


class User(Base):
    __tablename__ = "User"

    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    id_telegram = Column(Integer)
    name = Column(String)
    office_id = Column(Integer, ForeignKey("Office.id"))
    scoreTime = relationship("ScoreTime")
    children = relationship("Score")

