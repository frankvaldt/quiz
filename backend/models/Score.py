import uuid

from sqlalchemy import Column, Integer, ForeignKey, Text
from init import Base


class Score(Base):
    __tablename__ = "Score"

    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    score = Column(Integer)
    id_user = Column(Integer, ForeignKey("User.id"))
    id_quiz_group = Column(Integer, ForeignKey("QuizGroup.id"))
