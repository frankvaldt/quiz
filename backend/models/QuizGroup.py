import uuid

from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from AdminPanel.backend.models.Score import Score
from AdminPanel.backend.models.Quiz import Quiz

from init import Base


class QuizGroup(Base):
    __tablename__ = "QuizGroup"

    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    title = Column(String)
    quiz = relationship("Quiz")
    score = relationship("Score")
