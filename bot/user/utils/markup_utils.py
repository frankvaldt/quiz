from AdminPanel.backend.models.Score import Score

from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, KeyboardButtonPollType
from aiogram.utils.callback_data import CallbackData
from AdminPanel.backend.models.QuizGroup import QuizGroup
from AdminPanel.backend.models.Answer import Answer

from sqlalchemy.future import select
from AdminPanel.bot.user.utils.utils import get_values_from_query

quizGroupCallBack = CallbackData("qiz", "quiz_group_id")
answerCallBack = CallbackData("answer", "id")
myCallBack = CallbackData("my", "curr_id")


async def set_answer_markup(text):
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    txt = "Ваш ответ: " + text
    markup.add(
        InlineKeyboardButton(txt, callback_data=answerCallBack.new(id='x'), request_poll=KeyboardButtonPollType()))
    return markup


async def markup_quiz_group():
    quizzes_groups = await get_values_from_query(select(QuizGroup))
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    for quiz_group in quizzes_groups:
        markup.add(
            InlineKeyboardButton(quiz_group.title, callback_data=quizGroupCallBack.new(quiz_group_id=quiz_group.id),
                                 request_poll=KeyboardButtonPollType()))
    return markup


async def get_markup_without_passed(user_id: str):
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


async def generate_answers_buttons(quiz):
    markup = InlineKeyboardMarkup(one_time_keyboard=True)
    answers = await get_values_from_query(select(Answer).where(Answer.id_Quiz == quiz.id))
    for elem in answers:
        markup.add(InlineKeyboardButton(elem.text,
                                        callback_data=myCallBack.new(curr_id=elem.id),
                                        request_poll=KeyboardButtonPollType()))
    return markup
