from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from AdminPanel.backend.models.Score import Score
from AdminPanel.backend.models.Quiz import Quiz

from init import Base


class QuizGroup(Base):
    __tablename__ = "QuizGroup"

    id = Column(Integer, autoincrement=True, primary_key=True)
    title = Column(String)
    children = relationship("Quiz")
    children2 = relationship("Score")
