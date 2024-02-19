from typing import List, Optional
from pydantic import BaseModel
from datetime import date

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    Name: str
    Surname: str
    Email: str
    Password: str
    IsBotanist: bool
    Birthday: date

class UserCreate(UserBase):
    pass

class User(UserBase):
    Id: int

    class Config:
        orm_mode = True

class PlantQuestionBase(BaseModel):
    Picture: Optional[str]
    Title: str
    Content: str
    DateSent: date

class PlantQuestionCreate(PlantQuestionBase):
    pass

class PlantQuestion(PlantQuestionBase):
    Id: int
    IdOwner: int

    class Config:
        orm_mode = True

class AnswerBase(BaseModel):
    Content: str
    DateSent: date
    Picture: Optional[str]

class AnswerCreate(AnswerBase):
    pass

class Answer(AnswerBase):
    Id: int
    IdSender: int
    IdQuestion: int

    class Config:
        orm_mode = True

class PlantGuardingBase(BaseModel):
    Name: str
    Description: Optional[str]
    Picture: Optional[str]
    DateStart: date
    DateEnd: Optional[date]
    Location: Optional[str]
    
class PlantGuardingCreate(PlantGuardingBase):
    pass

class PlantGuarding(PlantGuardingBase):
    Id: int
    IdOwner: int
    IdGuard: Optional[int]

    class Config:
        orm_mode = True

class MessageBase(BaseModel):
    Content: str
    DateSent: date

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    Id: int
    IdSender: int
    IdReceiver: int

    class Config:
        orm_mode = True
