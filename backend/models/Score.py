from sqlalchemy import Column, Integer, ForeignKey
from init import Base


class Score(Base):
    __tablename__ = "Score"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    score = Column(Integer)
    id_user = Column(Integer, ForeignKey("User.id"))
    id_quiz_group = Column(Integer, ForeignKey("QuizGroup.id"))
