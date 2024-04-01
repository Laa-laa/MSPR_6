from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "User"

    Id = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String, nullable=False)
    Surname = Column(String, nullable=False)
    Email = Column(String, nullable=False, unique=True)
    Password = Column(String, nullable=False)
    IsBotanist = Column(Boolean, nullable=False, default=False)
    Birthday = Column(Date, nullable=False)

    plant_guardings = relationship(
        "PlantGuarding", foreign_keys="[PlantGuarding.IdOwner]"
    )
    questions = relationship("PlantQuestion", back_populates="owner")


class PlantQuestion(Base):
    __tablename__ = "PlantQuestion"

    Id = Column(Integer, primary_key=True, autoincrement=True)
    IdOwner = Column(Integer, ForeignKey("User.Id"), nullable=False)
    Picture = Column(String)
    Title = Column(String, nullable=False)
    Content = Column(String, nullable=False)
    DateSent = Column(Date, nullable=False)

    owner = relationship("User", back_populates="questions")
    answers = relationship("Answer", back_populates="question")


class Answer(Base):
    __tablename__ = "Answer"

    Id = Column(Integer, primary_key=True, autoincrement=True)
    IdSender = Column(Integer, ForeignKey("User.Id"), nullable=False)
    IdQuestion = Column(Integer, ForeignKey("PlantQuestion.Id"), nullable=False)
    Content = Column(String, nullable=False)
    DateSent = Column(Date, nullable=False)
    Picture = Column(String)

    sender = relationship("User")
    question = relationship("PlantQuestion", back_populates="answers")


class PlantGuarding(Base):
    __tablename__ = "PlantGuarding"

    Id = Column(Integer, primary_key=True, autoincrement=True)
    IdOwner = Column(Integer, ForeignKey("User.Id"), nullable=False)
    IdGuard = Column(Integer, ForeignKey("User.Id"))
    Name = Column(String, nullable=False)
    Description = Column(String)
    Picture = Column(String)
    DateStart = Column(Date, nullable=False)
    DateEnd = Column(Date)
    Location = Column(String)

    owner = relationship(
        "User", foreign_keys=[IdOwner], back_populates="plant_guardings"
    )
    guard = relationship("User", foreign_keys=[IdGuard])


class Message(Base):
    __tablename__ = "Message"

    Id = Column(Integer, primary_key=True, autoincrement=True)
    IdSender = Column(Integer, ForeignKey("User.Id"), nullable=False)
    IdReceiver = Column(Integer, ForeignKey("User.Id"), nullable=False)
    Content = Column(String, nullable=False)
    DateSent = Column(Date, nullable=False)

    sender = relationship("User", foreign_keys=[IdSender])
    receiver = relationship("User", foreign_keys=[IdReceiver])
