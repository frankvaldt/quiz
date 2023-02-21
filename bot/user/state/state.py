from aiogram.dispatcher.filters.state import State, StatesGroup


class UserState(StatesGroup):
    name = State()
    office = State()


class QuizGroupState(StatesGroup):
    title = State()
    title2 = State()
