import uuid

from sqlalchemy import Column, Text, DateTime, Integer, ForeignKey
from backend.init import Base


class ScoreTime(Base):
    __tablename__ = "ScoreTime"

    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    start = Column(DateTime)
    end = Column(DateTime)
    id_user = Column(Integer, ForeignKey("User.id"))
    id_quiz_group = Column(Integer, ForeignKey("QuizGroup.id"))
