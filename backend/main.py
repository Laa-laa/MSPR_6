from sqlalchemy import create_engine
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker


# https://docs.sqlalchemy.org/en/14/orm/quickstart.html

# Declarative Mapping

Base = declarative_base()


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True)
    name = Column(String(30))
    surname = Column(String)
    email = Column(String)
    password = Column(String)
    isBotanist = Column(Boolean)
    birthday = Column(Integer)

    # useful for debugging
    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"


engine = create_engine("sqlite:///DB_MSPR_6.db")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

all_users = session.query(User).all()

for user in all_users:
    print(
        f"ID: {user.id}, Name: {user.name}, Surname: {user.surname}, Email: {user.email}"
    )
