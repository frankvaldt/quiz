from sqlalchemy.ext.asyncio import AsyncSession

from AdminPanel.backend.init import engine
from AdminPanel.backend.models.QuizGroup import QuizGroup
from dto.dto import QuizGroupDto, QuizDto, AnswerDto
from AdminPanel.backend.models.Quiz import Quiz
from AdminPanel.backend.models.Answer import Answer
from sqlalchemy.future import select


async def add_quiz_group(quiz_group):
    quiz_group_dto = convert_to_quiz_group_dto(quiz_group)
    session = AsyncSession(engine, expire_on_commit=False)
    new_group = QuizGroup(title=quiz_group_dto.title)
    try:
        await add_and_refresh(new_group, session)
    finally:
        await session.close()
    for quiz in quiz_group_dto.quiz:
        new_quiz = Quiz(id_QuizGroup=new_group.id, image=quiz.img, question=quiz.question, timer=quiz.timer)
        try:
            await add_and_refresh(new_quiz, session)
        finally:
            await session.close()
        for answer in quiz.answers:
            print(answer.is_correct)
            new_answer = Answer(id_Quiz=new_quiz.id, text=answer.text, correct=answer.is_correct)
            try:
                session.add(new_answer)
                await session.commit()
            finally:
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
            answers.append(AnswerDto(text=y['text'], is_correct=y['isCorrect']))
        quizzes_dto.append(QuizDto(img=x['img'], timer=x['timer'], question=x['question'], answers=answers))
    return QuizGroupDto(title=quiz_group['title'], quiz=quizzes_dto)


async def get_quizzes_groups():
    session = AsyncSession(engine, expire_on_commit=False)
    query = select(Quiz, QuizGroup, Answer).join_from(Quiz, QuizGroup).join_from(
        Answer, Quiz).label('NewId')
    elems = await session.execute(query)
    for elem in elems.scalars().all():
        print("elem: ", elem.title)
        print("quiz", elem.question)
