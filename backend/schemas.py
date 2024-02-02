from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str | None = None
    surname: str
    email: str
    password: str
    isBotanist: bool
    birthday: str
