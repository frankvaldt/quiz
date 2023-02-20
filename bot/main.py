from user.service import set_user
from init import dp, basedir
from config import API_TOKEN
import sys
import os

from aiogram.utils import executor
from aiogram.types import Message

sys.path.append(os.getcwd())


@dp.message_handler(commands=['start'])
async def start(message: Message):
    await set_user(message)


if __name__ == '__main__':
    print('config ', API_TOKEN)
    if __package__ is None:
        import sys
        from os import path

        sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
    # cli()
    executor.start_polling(dp, skip_updates=True)
