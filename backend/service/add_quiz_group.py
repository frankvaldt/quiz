from sqlalchemy.ext.asyncio import AsyncSession

from frontend.backend.init import engine, get_session
from frontend.backend.models.QuizGroup import QuizGroup
from dto.dto import QuizGroupDto, QuizDto, AnswerDto
from frontend.backend.models.Quiz import Quiz


async def add_quiz_group(quiz_group):
    quiz_group_dto = convert_to_quiz_group_dto(quiz_group)
    session = AsyncSession(engine, expire_on_commit=False)
    new_group = QuizGroup(title=quiz_group_dto.title)
    try:
        session.add(new_group)
        await session.commit()
        await session.flush()
        await session.refresh(new_group)
    finally:
        await session.close()
    print(new_group.id)
    for quiz in quiz_group_dto.quiz:
        new_quiz = Quiz(id_QuizGroup=new_group.id, image=quiz.img, question=quiz.question, timer=quiz.timer)
        try:
            session.add(new_quiz)
            await session.commit()
            await session.flush()
            await session.refresh(new_quiz)
        finally:
            await session.close()


def convert_to_quiz_group_dto(quiz_group):
    quizzes_dto = []
    for x in quiz_group['quiz']:
        answers = []
        for y in x['answers']:
            answers.append(AnswerDto(text=y['text'], is_correct=y['isCorrect']))
        quizzes_dto.append(QuizDto(img=x['img'], timer=x['timer'], question=x['question'], answers=answers))
    return QuizGroupDto(title=quiz_group['title'], quiz=quizzes_dto)
