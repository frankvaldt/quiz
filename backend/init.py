from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
import logging
import os

basedir = os.path.abspath(os.path.dirname(__file__))
logging.basicConfig(level=logging.INFO)

# Initialize database
engine = create_async_engine(
    'sqlite+aiosqlite:///' + os.path.join(basedir, 'db'),
    echo=True)
Base = declarative_base()
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


async def init_models():
    async with engine.begin() as conn:
        import frontend.backend.models.QuizGroup
        import frontend.backend.models.Quiz
        import frontend.backend.models.Answer
        import frontend.backend.models.User
        import frontend.backend.models.Office
        import frontend.backend.models.Score

        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


# Dependency
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session
