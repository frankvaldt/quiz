from sqlalchemy.future import select
import base64

from aiogram import types
from aiogram.dispatcher import FSMContext
from aiogram.types import CallbackQuery

from AdminPanel.backend.models.QuizGroup import QuizGroup
from AdminPanel.backend.models.Quiz import Quiz
from AdminPanel.backend.models.Answer import Answer

from AdminPanel.bot.user.utils.utils import get_index_of_quiz
from AdminPanel.bot.init_bot import dp, bot
from AdminPanel.bot.user.state.state import QuizGroupState
from AdminPanel.bot.user.utils.score_utils import change_score
from AdminPanel.bot.user.utils.utils import get_values_from_query, \
    check_quiz_group, get_value_from_query
from AdminPanel.bot.user.utils.markup_utils import set_answer_markup, get_markup_without_passed, quizGroupCallBack, \
    myCallBack, \
    generate_answers_buttons
from AdminPanel.bot.user.utils.time_utils import create_time, set_end_time


@dp.message_handler(check_quiz_group, state=QuizGroupState.title)
async def process_office_invalid(message: types.Message):
    return await message.reply("Такой викторины у нас нет. Выберите другую викторину из предложенных:")


@dp.message_handler(state=QuizGroupState.title)
async def set_quiz_group(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['title'] = message.text
        quiz_group = await get_value_from_query(select(QuizGroup).where(QuizGroup.title == data['title']))
        quizzes = await get_values_from_query(select(Quiz).where(Quiz.id_QuizGroup == quiz_group.id).order_by(Quiz.id))
        await create_time(message.from_user.id, quiz_group.id)
        markup = await generate_answers_buttons(quizzes[0])
        await message.answer(text=quizzes[0].question,
                             reply_markup=markup)
    await state.finish()
    await QuizGroupState.title.set()


@dp.callback_query_handler(quizGroupCallBack.filter())
async def quiz_group_handler(query: CallbackQuery, callback_data: dict):
    await query.message.delete()
    quiz_group_id = callback_data.get("quiz_group_id")
    quiz_group = await get_value_from_query(select(QuizGroup).where(QuizGroup.id == quiz_group_id))
    quizzes = await get_values_from_query(select(Quiz).where(Quiz.id_QuizGroup == quiz_group.id))
    await send_quiz_to_user(quizzes[0], query)


@dp.callback_query_handler(myCallBack.filter())
async def answer(query: CallbackQuery, callback_data: dict):
    curr_id = callback_data.get("curr_id")
    user_id = query["from"].id

    answer_query = await get_value_from_query(select(Answer).where(Answer.id == curr_id))
    quiz_query = await get_value_from_query(select(Quiz).where(Quiz.id == answer_query.id_Quiz))
    quiz_group_query = await get_value_from_query(select(QuizGroup).where(QuizGroup.id == quiz_query.id_QuizGroup))
    all_quizzes = await get_values_from_query(
        select(Quiz).where(Quiz.id_QuizGroup == quiz_group_query.id))

    await change_score(quiz_group_query, answer_query, user_id)
    index = get_index_of_quiz(all_quizzes, quiz_query.id)
    await change_quiz_by_index(index, all_quizzes, user_id, answer_query, query, quiz_group_query.id)


async def change_quiz_by_index(index, all_quizzes, user_id, answer_query, query, quiz_group_id):
    chat_id = query.message.chat.id
    message_id = query.message.message_id
    if index + 1 >= len(all_quizzes):
        markup = await get_markup_without_passed(user_id)
        await save_answer(query, answer_query.text, chat_id, message_id)
        if len(markup.values['inline_keyboard']) > 0:
            await set_end_time(user_id, quiz_group_id)
            await query.message.answer(text='Выберите викторину: ', reply_markup=markup)
        else:
            await query.message.answer(text='Все викторины закончились, поздавляю с прохождением!')
    else:
        quiz = all_quizzes[index + 1]
        await save_answer(query, answer_query.text, chat_id, message_id)
        await send_quiz_to_user(quiz, query)


async def save_answer(query, text, chat_id, message_id):
    await query.message.edit_text(text="Ваш ответ сохранен")
    mk = await set_answer_markup(text)
    await bot.edit_message_reply_markup(chat_id, message_id, reply_markup=mk)


async def send_quiz_to_user(quiz, query):
    img = base64.b64decode(quiz.image.split(',')[1])
    try:
        if img:
            await bot.send_photo(query.from_user.id, img)
    finally:
        markup = await generate_answers_buttons(quiz)
        await query.message.answer(text=quiz.question,
                                   reply_markup=markup)
