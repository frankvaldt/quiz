from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from AdminPanel.backend.models.Answer import Answer

from init import Base


class Quiz(Base):
    __tablename__ = "Quiz"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    id_QuizGroup = Column(Integer, ForeignKey("QuizGroup.id"))
    image = Column(String)
    question = Column(String)
    timer = Column(Integer)
    children = relationship("Answer")

    def __init__(self, **kwargs):
        super(Quiz, self).__init__(**kwargs)
