from aiogram.dispatcher import FSMContext
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, KeyboardButtonPollType, CallbackQuery
from aiogram.utils.callback_data import CallbackData
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

myCallBack = CallbackData("my", "curr_id", "correct")
quizGroupCallBack = CallbackData("qiz", "quiz_group_id")


async def markup_quiz_group():
    quizzes_groups = await get_values_from_query(select(QuizGroup))
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    for quiz_group in quizzes_groups:
        markup.add(
            InlineKeyboardButton(quiz_group.title, callback_data=quizGroupCallBack.new(quiz_group_id=quiz_group.id),
                                 request_poll=KeyboardButtonPollType()))
    return markup


async def get_markup_without_passed(user_id):
    scores = await get_values_from_query(select(Score).where(Score.id_user == user_id))
    select_groups = select(QuizGroup)
    for score in scores:
        select_groups = select_groups.where(QuizGroup.id != score.id_quiz_group)
    quizzes_groups = await get_values_from_query(select_groups)
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    for quiz_group in quizzes_groups:
        markup.add(
            InlineKeyboardButton(quiz_group.title,
                                 callback_data=quizGroupCallBack.new(quiz_group_id=quiz_group.id),
                                 request_poll=KeyboardButtonPollType()))
    return markup


@dp.message_handler(check_quiz_group, state=QuizGroupState.title)
async def process_office_invalid(message: types.Message):
    return await message.reply("Такой викторины у нас нет. Выберите другую викторину из предложенных:")


@dp.message_handler(state=QuizGroupState.title)
async def set_quiz_group(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['title'] = message.text
        quiz_group = await get_value_from_query(select(QuizGroup).where(QuizGroup.title == data['title']))
        quizzes = await get_values_from_query(select(Quiz).where(Quiz.id_QuizGroup == quiz_group.id).order_by(Quiz.id))

        markup = await generate_answers_buttons(quizzes[0])
        await message.answer(text=quizzes[0].question,
                             reply_markup=markup)
    await state.finish()
    await QuizGroupState.title.set()


async def generate_answers_buttons(quiz):
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    answers = await get_values_from_query(select(Answer).where(Answer.id_Quiz == quiz.id))
    for elem in answers:
        markup.add(InlineKeyboardButton(elem.text,
                                        callback_data=myCallBack.new(curr_id=elem.id, correct=elem.correct),
                                        request_poll=KeyboardButtonPollType()))
    return markup


@dp.callback_query_handler(quizGroupCallBack.filter())
async def quiz_group_handler(query: CallbackQuery, callback_data: dict):
    await query.message.delete()
    quiz_group_id = callback_data.get("quiz_group_id")
    quiz_group = await get_value_from_query(select(QuizGroup).where(QuizGroup.id == quiz_group_id))
    quizzes = await get_values_from_query(select(Quiz).where(Quiz.id_QuizGroup == quiz_group.id).order_by(Quiz.id))

    markup = await generate_answers_buttons(quizzes[0])
    await query.message.answer(text=quizzes[0].question,
                               reply_markup=markup)


@dp.callback_query_handler(myCallBack.filter())
async def answer(query: CallbackQuery, callback_data: dict):
    curr_id = callback_data.get("curr_id")
    correct = callback_data.get("correct")
    user_id = query["from"].id
    chat_id = query.message.chat.id
    message_id = query.message.message_id

    answer_query = await get_value_from_query(select(Answer).where(Answer.id == curr_id))
    quiz_query = await get_value_from_query(select(Quiz).where(Quiz.id == answer_query.id_Quiz))

    quiz_group_query = await get_value_from_query(select(QuizGroup).where(QuizGroup.id == quiz_query.id_QuizGroup))

    all_quizzes = await get_values_from_query(
        select(Quiz).where(Quiz.id_QuizGroup == quiz_group_query.id).order_by(Quiz.id_QuizGroup))

    session = AsyncSession(engine, expire_on_commit=False)
    await get_or_create_score(session, Score, id_user=user_id, id_quiz_group=quiz_group_query.id)
    await session.execute(
        update(Score).where(Score.id_user == user_id, Score.id_quiz_group == quiz_group_query.id).values(
            score=Score.score + answer_query.correct))
    await session.commit()

    index = -1
    for index, item in enumerate(all_quizzes):
        if item.id == quiz_query.id:
            break
        else:
            index = -1
    if index + 1 >= len(all_quizzes):
        markup = await get_markup_without_passed(user_id)
        if len(markup.values['inline_keyboard']) > 0:
            await query.message.edit_text(text='Выберите викторину: ')
            await bot.edit_message_reply_markup(chat_id, message_id, reply_markup=markup)
        else:
            await query.message.delete()
            await query.message.answer(text='Все викторины закончились, поздавляю с прохождением!')
    else:
        quiz = all_quizzes[index + 1]
        markup = await generate_answers_buttons(quiz)
        await query.message.edit_text(text=quiz.question)
        await bot.edit_message_reply_markup(chat_id, message_id, reply_markup=markup)


async def get_or_create_score(session, model, id_user, id_quiz_group):
    instance = await session.execute(select(model).filter_by(id_user=id_user, id_quiz_group=id_quiz_group))
    instance = instance.scalars().first()
    if not instance:
        instance = Score(id_user=id_user, id_quiz_group=id_quiz_group, score=0)
        session.add(instance)
        await session.commit()
