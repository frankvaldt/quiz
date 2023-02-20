from aiogram.dispatcher import FSMContext
from aiogram.types import Message
from aiogram.dispatcher.filters.state import State, StatesGroup
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from init_bot import dp, bot, engine
from aiogram import types
from aiogram.types import ParseMode
import aiogram.utils.markdown as md

from AdminPanel.backend.models.Office import Office
from AdminPanel.backend.models.User import User


class Form(StatesGroup):
    name = State()
    office = State()


async def set_user(message: Message):
    await Form.name.set()
    await message.answer('Привет, как тебя зовут?')


@dp.message_handler(state=Form.name)
async def process_name(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['name'] = message.text

    await Form.next()
    await state.update_data(name=message.text)
    session = AsyncSession(engine, expire_on_commit=False)
    offices_select = await session.execute(select(Office))
    offices = offices_select.scalars().all()
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
    for office in offices:
        markup.add(office.name)
    await message.reply("Выбери свой офис:", reply_markup=markup)


@dp.message_handler(lambda message: message.text.isdigit(), state=Form.office)
async def process_age(message: types.Message, state: FSMContext):
    # Update state and data
    await Form.next()
    await state.update_data(age=int(message.text))


async def check_office(message: Message):
    session = AsyncSession(engine, expire_on_commit=False)
    offices_select = await session.execute(select(Office))
    offices = offices_select.scalars().all()
    offices_name = [x.name for x in offices]
    await session.close()
    return message.text not in offices_name


@dp.message_handler(check_office, state=Form.office)
async def process_office_invalid(message: types.Message):
    return await message.reply("Такого офиса у нас нет. Выберите другой офис из предложенных:")


@dp.message_handler(state=Form.office)
async def process_gender(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['office'] = message.text

        # Remove keyboard
        markup = types.ReplyKeyboardRemove()
        session = AsyncSession(engine, expire_on_commit=False)
        office_select = await session.execute(select(Office).where(Office.name == data['office']))
        office = office_select.scalars().one()
        new_user = User(name=data['name'], id_telegram=message.from_user.id, office_id=office.id)
        # And send message
        await bot.send_message(
            message.chat.id,
            md.text(
                md.text('Hi! Nice to meet you,', md.bold(data['name'])),
                md.text('Office:', md.code(data['office'])),
                sep='\n',
            ),
            reply_markup=markup,
            parse_mode=ParseMode.MARKDOWN,
        )
        session.add(new_user)
        await session.commit()
    # Finish conversation
    await state.finish()
