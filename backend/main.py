from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Date
from sqlalchemy.orm import relationship
from fastapi import FastAPI
from models import *

# https://docs.sqlalchemy.org/en/14/orm/quickstart.html

app = FastAPI()
