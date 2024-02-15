from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Date
from sqlalchemy.orm import relationship
from fastapi import FastAPI
from models import *

# https://docs.sqlalchemy.org/en/14/orm/quickstart.html
# https://fastapi.tiangolo.com/tutorial/sql-databases/

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Fastapi is working!"}
