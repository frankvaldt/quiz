from aiogram.dispatcher import FSMContext
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, KeyboardButtonPollType

from AdminPanel.backend.models.QuizGroup import QuizGroup
from AdminPanel.backend.models.Quiz import Quiz
from AdminPanel.backend.models.Score import Score
from AdminPanel.backend.models.Answer import Answer

from sqlalchemy.ext.asyncio import AsyncSession
from init_bot import dp, bot, engine
from sqlalchemy.future import select
from sqlalchemy import update

from aiogram import types

from user.state.state import QuizGroupState
from user.utils.utils import get_values_from_query, check_quiz_group, get_value_from_query


async def markup_quiz_group():
    quizzes_groups = await get_values_from_query(select(QuizGroup))
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
    for quiz_group in quizzes_groups:
        markup.add(quiz_group.title)
    return markup


@dp.message_handler(check_quiz_group, state=QuizGroupState.title)
async def process_office_invalid(message: types.Message):
    return await message.reply("Такой викторины у нас нет. Выберите другую викторину из предложенных:")


@dp.message_handler(state=QuizGroupState.title)
async def set_quiz_group(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['title'] = message.text
        print(data['title'])
        quiz_group = await get_value_from_query(select(QuizGroup).where(QuizGroup.title == data['title']))
        quizzes = await get_values_from_query(select(Quiz).where(Quiz.id_QuizGroup == quiz_group.id))
        for quiz in quizzes:
            markup = await generate_answers_buttons(quiz)
            await message.answer(text=quiz.question,
                                 reply_markup=markup)

    await state.finish()


async def generate_answers_buttons(quiz):
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    answers = await get_values_from_query(select(Answer).where(Answer.id_Quiz == quiz.id))
    for elem in answers:
        markup.add(InlineKeyboardButton(elem.text,
                                        callback_data=elem.id,
                                        request_poll=KeyboardButtonPollType()))
    return markup


@dp.callback_query_handler()
async def answer(call):
    id_answer = call.data
    answer_query = await get_value_from_query(select(Answer).where(Answer.id == id_answer))
    quiz_query = await get_values_from_query(select(Quiz).where(Quiz.id == answer_query.id_Quiz))
    quiz_group_query = await get_value_from_query(select(QuizGroup).where(QuizGroup.id == quiz_query[0].id_QuizGroup))
    session = AsyncSession(engine, expire_on_commit=False)
    await get_or_create_score(session, Score, id_user=call["from"].id, id_quiz_group=quiz_group_query.id)
    await session.execute(update(Score).values(score=Score.score + answer_query.correct))
    await session.commit()


async def get_or_create_score(session, model, id_user, id_quiz_group):
    instance = await session.execute(select(model).filter_by(id_user=id_user, id_quiz_group=id_quiz_group))
    instance = instance.scalars().first()
    if instance:
        return instance
    else:
        instance = model(id_user=id_user, id_quiz_group=id_quiz_group, score=0)
        session.add(instance)
        session.commit()
        return instance
