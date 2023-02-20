from aiogram.dispatcher import FSMContext
from aiogram.types import Message
from aiogram.dispatcher.filters.state import State, StatesGroup
from init_bot import dp, bot
from aiogram import types
from aiogram.types import ParseMode
import aiogram.utils.markdown as md


class Form(StatesGroup):
    name = State()
    office = State()


async def set_user(message: Message):
    await Form.name.set()
    await message.answer('Привет, как тебя зовут?')


@dp.message_handler(state=Form.name)
async def process_name(message: types.Message, state: FSMContext):
    """
    Process user name
    """
    async with state.proxy() as data:
        data['name'] = message.text

    await Form.next()
    await state.update_data(name=message.text)
    # Configure ReplyKeyboardMarkup
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
    markup.add("Freedom", "Gallery")
    markup.add("Other")

    await message.reply("Выбери свой офис:", reply_markup=markup)


@dp.message_handler(lambda message: message.text.isdigit(), state=Form.office)
async def process_age(message: types.Message, state: FSMContext):
    # Update state and data
    await Form.next()
    await state.update_data(age=int(message.text))


@dp.message_handler(lambda message: message.text not in ["Freedom", "Gallery", "Other"], state=Form.office)
async def process_office_invalid(message: types.Message):
    return await message.reply("Такого офиса у нас нет. Выберите другой офис из предложенных:")


@dp.message_handler(state=Form.office)
async def process_gender(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['office'] = message.text

        # Remove keyboard
        markup = types.ReplyKeyboardRemove()

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

    # Finish conversation
    await state.finish()
