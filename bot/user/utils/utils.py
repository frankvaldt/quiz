from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession
from aiogram.types import Message
from sqlalchemy.future import select
from init_bot import engine

from AdminPanel.backend.models.Office import Office


async def get_values_from_query(query: Select):
    session = AsyncSession(engine, expire_on_commit=False)
    values = await session.execute(query)
    await session.close()
    return values.scalars().all()


async def check_office(message: Message) -> bool:
    offices = await get_values_from_query(select(Office))
    offices_name = [x.name for x in offices]
    return message.text not in offices_name
