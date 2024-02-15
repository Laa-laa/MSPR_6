from pydantic import BaseModel


# Pydantic models
class User(BaseModel):
    id: int
    name: str | None = None
    surname: str
    email: str
    password: str
    isBotanist: bool
    birthday: str


class Message(BaseModel):
    id: int
    idSender: int
    idReceiver: int
    content: str
    dateSent: str
