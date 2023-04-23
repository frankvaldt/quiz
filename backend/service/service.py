from sqlalchemy.ext.asyncio import AsyncSession

from backend.init import engine
from backend.models.QuizGroup import QuizGroup
from backend.dto.dto import QuizGroupDto, QuizDto, AnswerDto, StatisticForOfficeDto, StatisticDto
from backend.models.Quiz import Quiz
from backend.models.Answer import Answer
from backend.models.Score import Score
from backend.models.Office import Office
from sqlalchemy.future import select
from sqlalchemy import delete, update

from backend.models.User import User
from sqlalchemy.orm import Bundle
import uuid

from flask import jsonify

from bot.user.utils.utils import get_values_from_query, get_value_from_query


async def update_quiz_group(quiz_group):
    quiz_group_dto = convert_to_quiz_group_dto(quiz_group)
    session = AsyncSession(engine, expire_on_commit=False)
    query = (update(QuizGroup).where(QuizGroup.id == quiz_group_dto.id).values(title=quiz_group_dto.title))
    await session.execute(query)
    await delete_quiz(quiz_group_dto.id, session)
    await add_quiz_to_quiz_group(quiz_group_dto.id, quiz_group_dto, session)
    await session.commit()
    await session.close()


async def add_quiz_group(quiz_group):
    quiz_group_dto = convert_to_quiz_group_dto(quiz_group)
    session = AsyncSession(engine, expire_on_commit=False)
    new_group = QuizGroup(title=quiz_group_dto.title)
    try:
        await add_and_refresh(new_group, session)
    finally:
        await session.close()
        await add_quiz_to_quiz_group(new_group.id, quiz_group_dto, session)


async def add_quiz_to_quiz_group(quiz_group_id: str, quiz_group_dto: QuizGroupDto, session: AsyncSession):
    for quiz in quiz_group_dto.quiz:
        new_quiz = Quiz(id_QuizGroup=quiz_group_id, image=quiz.img, question=quiz.question, timer=quiz.timer)
        try:
            await add_and_refresh(new_quiz, session)
        finally:
            await session.close()
        for answer in quiz.answers:
            new_answer = Answer(id_Quiz=new_quiz.id, text=answer.text, correct=answer.isCorrect)
            try:
                session.add(new_answer)
                await session.commit()
            finally:
                await session.close()


async def delete_quiz(quiz_group_id: str, session: AsyncSession):
    id_quiz_select = await session.execute(select(Quiz.id).where(Quiz.id_QuizGroup == quiz_group_id))
    id_quizzes = id_quiz_select.scalars().all()
    await session.execute(delete(Quiz).where(Quiz.id_QuizGroup == quiz_group_id))
    for id_quiz in id_quizzes:
        await session.execute(delete(Answer).where(Answer.id_Quiz == id_quiz))
    await session.commit()
    await session.close()


async def add_and_refresh(instance, session):
    session.add(instance)
    await session.commit()
    await session.flush()
    await session.refresh(instance)


def convert_to_quiz_group_dto(quiz_group):
    quizzes_dto = []
    for x in quiz_group['quiz']:
        answers = []
        for y in x['answers']:
            answers.append(AnswerDto(text=y['text'],
                                     isCorrect=y['isCorrect'],
                                     id=y['id'],
                                     idQuiz=y['idQuiz']))

        quizzes_dto.append(QuizDto(img=x['img'],
                                   timer=x['timer'],
                                   question=x['question'],
                                   answers=answers,
                                   id=x['id'],
                                   idQuizGroup=x['idQuizGroup']))

    return QuizGroupDto(title=quiz_group['title'],
                        quiz=quizzes_dto,
                        id=quiz_group['id'])


async def get_quizzes_groups():
    session = AsyncSession(engine, expire_on_commit=False)
    query = select(QuizGroup)
    quiz_groups = await session.execute(query)
    quiz_groups_dto = []
    for quiz_group in quiz_groups.scalars().all():
        query2 = select(Quiz).where(Quiz.id_QuizGroup == quiz_group.id)
        quizzes = await session.execute(query2)
        quizzes_dto = []
        for quiz in quizzes.scalars().all():
            query3 = select(Answer).where(Answer.id_Quiz == quiz.id)
            answers = await session.execute(query3)
            answers_dto = []
            for answer in answers.scalars().all():
                answers_dto.append(AnswerDto(text=answer.text,
                                             isCorrect=answer.correct,
                                             id=answer.id, idQuiz=answer.id_Quiz))
            quizzes_dto.append(QuizDto(img=quiz.image,
                                       timer=quiz.timer,
                                       question=quiz.question,
                                       answers=answers_dto,
                                       id=quiz.id,
                                       idQuizGroup=quiz.id_QuizGroup))
        quiz_groups_dto.append(QuizGroupDto(title=quiz_group.title, quiz=quizzes_dto, id=quiz_group.id))
    await session.commit()
    return quiz_groups_dto


async def delete_quiz_group(id_group):
    session = AsyncSession(engine, expire_on_commit=False)
    await session.execute(delete(QuizGroup).where(QuizGroup.id == id_group))
    await delete_quiz(id_group, session)


async def get_statistic():
    offices = await get_values_from_query(select(Office))
    result_statistic = []
    for office in offices:
        scores = await get_statistic_by_office(office.id)
        if len(scores) > 0:
            result_statistic.append(StatisticDto(office=office.name, scores=scores))
    return result_statistic


async def get_statistic_by_office(office_id: str) -> list[StatisticForOfficeDto]:
    session = AsyncSession(engine, expire_on_commit=False)
    res = await session.execute(
        select(Bundle("User", User.id_telegram, User.name, User.id),
               Bundle("Score", Score.score, Score.id_quiz_group)).join(
            Score, User.id_telegram == Score.id_user).where(User.office_id == office_id).order_by(Score.score))
    scores = []
    for x in res:
        quiz = await get_value_from_query(select(QuizGroup).where(QuizGroup.id == x.Score.id_quiz_group))
        scores.append(StatisticForOfficeDto(telegramId=x.User.id_telegram,
                                            userName=x.User.name,
                                            score=x.Score.score,
                                            time=0,
                                            quizName=quiz.title,
                                            id=uuid.uuid4()))
    return scores
