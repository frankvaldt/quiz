from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from init import Base


class Answer(Base):
    __tablename__ = "Answer"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    text = Column(String)
    correct = Boolean
    id_Quiz = Column(Integer, ForeignKey("Quiz.id"))