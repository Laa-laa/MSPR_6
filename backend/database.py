from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import *
<<<<<<< HEAD

=======
>>>>>>> 5c9fb5d534aa02da0ae3cbabf5908cd34b59c804

engine = create_engine("sqlite:///DB_MSPR_6.db")


Session = sessionmaker(bind=engine)
session = Session()

# Declarative Mapping
Base = declarative_base()
Base.metadata.create_all(engine)


# Code for printing dataset

# all_messages = session.query(Message).all()
# for message in all_messages:
#     print(f"ID: {message.id}, Content: {message.content}")