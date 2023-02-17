import uuid

from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from init import Base


class Quiz(Base):
    __tablename__ = "Quiz"

    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    id_QuizGroup = Column(Integer, ForeignKey("QuizGroup.id"))
    image = Column(String)
    question = Column(String)
    timer = Column(Integer)
    children = relationship("Answer")
