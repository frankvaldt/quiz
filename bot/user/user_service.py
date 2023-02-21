from aiogram.dispatcher import FSMContext
from aiogram.types import Message, KeyboardButtonPollType
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from init_bot import dp, bot, engine
from aiogram import types
from aiogram.types import ParseMode
import aiogram.utils.markdown as md

from AdminPanel.backend.models.Office import Office
from AdminPanel.backend.models.User import User

from AdminPanel.bot.user.state.state import UserState, QuizGroupState
from user.quiz_service import markup_quiz_group
from user.utils.utils import get_values_from_query, check_office, get_value_from_query


async def set_user(message: Message):
    await UserState.name.set()
    await message.answer('Привет, как тебя зовут?')


@dp.message_handler(state=UserState.name)
async def process_name(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['name'] = message.text

    await UserState.next()
    await state.update_data(name=message.text)
    offices = await get_values_from_query(select(Office))
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
    for office in offices:
        markup.add(office.name)
    await message.reply("Выбери свой офис:", reply_markup=markup)


@dp.message_handler(check_office, state=UserState.office)
async def process_office_invalid(message: types.Message):
    return await message.reply("Такого офиса у нас нет. Выберите другой офис из предложенных:")


@dp.message_handler(state=UserState.office)
async def create_user(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['office'] = message.text

        # Remove keyboard
        session = AsyncSession(engine, expire_on_commit=False)
        office = await get_value_from_query(select(Office).where(Office.name == data['office']))
        new_user = User(name=data['name'], id_telegram=message.from_user.id, office_id=office.id)
        # And send message
        # markup = await markup_quiz_group()
        await bot.send_message(
            message.chat.id,
            md.text(
                md.text('Hi! Nice to meet you,', md.bold(data['name'])),
                md.text('Office:', md.code(data['office'])),
                sep='\n',
            ),
            # reply_markup=markup,
            parse_mode=ParseMode.MARKDOWN,
        )
        session.add(new_user)
        await session.commit()
        await session.close()
    # Finish conversation
    await state.finish()


@dp.message_handler(commands=['start_quiz'])
async def start_quiz(message: types.Message):
    markup = await markup_quiz_group()
    await QuizGroupState.title.set()
    await message.answer('Начнем викторину: ', reply_markup=markup)
