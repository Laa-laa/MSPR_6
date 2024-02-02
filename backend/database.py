from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


engine = create_engine("sqlite:///DB_MSPR_6.db")


Session = sessionmaker(bind=engine)
session = Session()

# Declarative Mapping
Base = declarative_base()
Base.metadata.create_all(engine)
