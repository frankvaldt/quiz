from AdminPanel.backend.models.QuizGroup import QuizGroup
from sqlalchemy.ext.asyncio import AsyncSession
from init_bot import dp, bot, engine
from sqlalchemy.future import select

from aiogram import types

from user.utils.utils import get_values_from_query


async def markup_quiz_group():
    quizzes_groups = await get_values_from_query(select(QuizGroup))
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
    for quiz_group in quizzes_groups:
        markup.add(quiz_group.title)
    return markup
