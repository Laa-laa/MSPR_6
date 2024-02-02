from sqlalchemy import create_engine
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Date
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker


# https://docs.sqlalchemy.org/en/14/orm/quickstart.html

# Declarative Mapping

Base = declarative_base()


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    surname = Column(String)
    email = Column(String)
    password = Column(String)
    isBotanist = Column(Boolean)
    birthday = Column(String)

    messages_sent = relationship(
        "Message", foreign_keys="[Message.idSender]", back_populates="sender"
    )
    messages_received = relationship(
        "Message", foreign_keys="[Message.idReceiver]", back_populates="receiver"
    )

    # useful for debugging
    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.surname!r})"


# class PlantQuestion(Base):
#     __tablename__ = "PlantQuestion"

#     id = Column(Integer, primary_key=True)
#     idOwner = Column(Integer)
#     picture = Column(String)
#     title = Column(String)
#     content = Column(String)
#     DateSent = Column(Date)


# class Answer(Base):
#     __tablename__ = "answer"

#     id = Column(Integer, primary_key=True)
#     idSender = Column(Integer)
#     idQuestion = Column(Integer)
#     content = Column(String)
#     DateSent = Column(Date)
#     picture = Column(String)

#     idSender = relationship(
#         "idSender", back_populates="user", cascade="all, delete-orphan"
#     )
#     idQuestion = relationship(
#         "idQuestion", back_populates="plantQuestion", cascade="all, delete-orphan"
#     )


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True)
    idSender = Column(Integer, ForeignKey("user.id"))
    idReceiver = Column(Integer, ForeignKey("user.id"))
    content = Column(String)
    dateSent = Column(String)

    sender = relationship(
        "User", foreign_keys=[idSender], back_populates="messages_sent"
    )
    receiver = relationship(
        "User", foreign_keys=[idReceiver], back_populates="messages_received"
    )


class PlantQuestion(Base):
    __tablename__ = "plantQuestion"

    id = Column(Integer, primary_key=True)
    idOwner = Column(Integer, ForeignKey("user.id"))
    picture = Column(String)
    title = Column(String)
    dateSent = Column(String)

    idOwnder = relationship("User", foreign_keys=[idOwner], back_populates="user")


engine = create_engine("sqlite:///DB_MSPR_6.db")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

all_messages = session.query(Message).all()
for message in all_messages:
    print(
        f"ID: {message.id}, Sender: {message.idSender}, Receiver: {message.idReceiver}, Content: {message.content}, Date Sent: {message.dateSent}"
    )
