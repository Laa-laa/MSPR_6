from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional

from database import SessionLocal

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Fonction pour obtenir un utilisateur par email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.Email == email).first()

# Fonction pour créer un utilisateur dans la base de données
def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.Password)
    db_user = models.User(Name=user.Name, Surname=user.Surname, Email=user.Email, Password=hashed_password, IsBotanist=user.IsBotanist, Birthday=user.Birthday)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Fonction pour vérifier les informations d'identification de l'utilisateur lors de la connexion
def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.Password):
        return None
    return user

# Fonction pour vérifier le mot de passe
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Fonction pour générer un token JWT
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Fonction pour décoder le token JWT
def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

####################################################################################
############ GET ###################################################################


# Questions
def get_plant_questions(db: Session):
    return db.query(models.PlantQuestion).all()


def get_plant_question_by_id(db: Session, question_id: int):
    return (
        db.query(models.PlantQuestion)
        .filter(models.PlantQuestion.Id == question_id)
        .first()
    )


# Sessions de garde
def get_plant_guardings(db: Session):
    return db.query(models.PlantGuarding).all()


def get_plant_guarding_by_id(db: Session, guarding_id: int):
    return (
        db.query(models.PlantGuarding)
        .filter(models.PlantGuarding.Id == guarding_id)
        .first()
    )


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.Id == user_id).first()


####################################################################################
############ POST ##################################################################


# Questions
def create_plant_question(
    db: Session, question: schemas.PlantQuestionCreate, owner_id: int
):
    db_question = models.PlantQuestion(**question.dict(), IdOwner=owner_id)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


# Sessions de garde
def create_plant_guarding(
    db: Session, guarding: schemas.PlantGuardingCreate, owner_id: int
):
    db_guarding = models.PlantGuarding(**guarding.dict(), IdOwner=owner_id)
    db.add(db_guarding)
    db.commit()
    db.refresh(db_guarding)
    return db_guarding


# Utilisateurs
# def create_user(db: Session, user: schemas.UserCreate):
#     db_user = models.User(**user.dict())
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# def authenticate_user(db: Session, email: str, password: str):
#     return db.query(models.User).filter(models.User.Email == email, models.User.Password == password).first()


# Messages
def create_message(
    db: Session, message: schemas.MessageCreate, sender_id: int, receiver_id: int
):
    db_message = models.Message(
        **message.dict(), IdSender=sender_id, IdReceiver=receiver_id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


####################################################################################
############ PUT ###################################################################


# Questions
def update_plant_question(
    db: Session, question_id: int, question: schemas.PlantQuestionCreate
):
    db.query(models.PlantQuestion).filter(
        models.PlantQuestion.Id == question_id
    ).update(question.dict())
    db.commit()
    return (
        db.query(models.PlantQuestion)
        .filter(models.PlantQuestion.Id == question_id)
        .first()
    )


# Sessions de garde
def update_plant_guarding(
    db: Session, guarding_id: int, guarding: schemas.PlantGuardingCreate
):
    db.query(models.PlantGuarding).filter(
        models.PlantGuarding.Id == guarding_id
    ).update(guarding.dict())
    db.commit()
    return (
        db.query(models.PlantGuarding)
        .filter(models.PlantGuarding.Id == guarding_id)
        .first()
    )


# Messages
def update_message(db: Session, message_id: int, message: schemas.MessageCreate):
    db.query(models.Message).filter(models.Message.Id == message_id).update(
        message.dict()
    )
    db.commit()
    return db.query(models.Message).filter(models.Message.Id == message_id).first()


####################################################################################
############ DELETE ################################################################


# Utilisateur
def delete_user(db: Session, user_id: int):
    db.query(models.User).filter(models.User.Id == user_id).delete()
    db.commit()


# Session de garde
def delete_plant_guarding(db: Session, guarding_id: int):
    db.query(models.PlantGuarding).filter(
        models.PlantGuarding.Id == guarding_id
    ).delete()
    db.commit()


# Message
def delete_message(db: Session, message_id: int):
    db.query(models.Message).filter(models.Message.Id == message_id).delete()
    db.commit()
