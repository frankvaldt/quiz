import datetime
from AdminPanel.backend.models.ScoreTime import ScoreTime
from AdminPanel.bot.init_bot import engine

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update


async def create_time(id_user: str, id_quiz_group: str):
    session = AsyncSession(engine, expire_on_commit=False)
    time = ScoreTime(id_user=id_user, id_quiz_group=id_quiz_group, start=datetime.datetime.now())
    session.add(time)
    await session.commit()
    await session.close()


async def set_end_time(id_user: str, id_quiz_group: str):
    session = AsyncSession(engine, expire_on_commit=False)
    query = (
        update(ScoreTime).where(ScoreTime.id_quiz_group == id_quiz_group).where(ScoreTime.id_user == id_user).values(
            end=datetime.datetime.now()))
    await session.execute(query)
    await session.close()
