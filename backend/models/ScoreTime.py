import uuid

from sqlalchemy import Column, Text, DateTime
from sqlalchemy.orm import relationship

from init import Base


class ScoreTime(Base):
    __tablename__ = "ScoreTime"
    id = Column('id', Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True)
    start = Column(DateTime)
    end = Column(DateTime)
