from user.user_service import set_user
from init_bot import dp
import sys
import os

from aiogram.utils import executor
from aiogram.types import Message

sys.path.append(os.getcwd())


@dp.message_handler(commands=['start'])
async def start(message: Message):
    await set_user(message)


if __name__ == '__main__':
    if __package__ is None:
        import sys
        from os import path

        sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
    executor.start_polling(dp, skip_updates=True)
