from AdminPanel.backend.models.Score import Score

from sqlalchemy.ext.asyncio import AsyncSession
from AdminPanel.bot.init_bot import engine
from sqlalchemy.future import select
from sqlalchemy import update


async def change_score(quiz_group_query, answer_query, user_id):
    session = AsyncSession(engine, expire_on_commit=False)
    await get_or_create_score(session, Score, id_user=user_id, id_quiz_group=quiz_group_query.id)
    await session.execute(
        update(Score).where(Score.id_user == user_id, Score.id_quiz_group == quiz_group_query.id).values(
            score=Score.score + answer_query.correct))
    await session.commit()


async def get_or_create_score(session, model, id_user, id_quiz_group):
    instance = await session.execute(select(model).filter_by(id_user=id_user, id_quiz_group=id_quiz_group))
    instance = instance.scalars().first()
    if not instance:
        instance = Score(id_user=id_user, id_quiz_group=id_quiz_group, score=0)
        session.add(instance)
        await session.commit()
