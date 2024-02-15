from pydantic import BaseModel


# Pydantic models

<<<<<<< HEAD

=======
>>>>>>> 5c9fb5d534aa02da0ae3cbabf5908cd34b59c804
class User(BaseModel):
    id: int
    name: str | None = None
    surname: str
    email: str
    password: str
    isBotanist: bool
    birthday: str

<<<<<<< HEAD

=======
>>>>>>> 5c9fb5d534aa02da0ae3cbabf5908cd34b59c804
class Message(BaseModel):
    id: int
    idSender: int
    idReceiver: int
    content: str
    dateSent: str
