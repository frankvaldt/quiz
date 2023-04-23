import uuid

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from backend.init import Base


class Answer(Base):
    __tablename__ = "Answer"

    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    text = Column(String)
    correct = Column(Boolean)
    id_Quiz = Column(Integer, ForeignKey("Quiz.id"))
