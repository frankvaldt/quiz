from aiogram.types import Message


async def set_user(message: Message):
    await message.answer('Привет, как тебя зовут')
