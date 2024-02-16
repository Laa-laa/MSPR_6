from sqlalchemy.orm import Session
from . import models, schemas

####################################################################################
############ GET ###################################################################

# Questions
def get_plant_questions(db: Session):
    return db.query(models.PlantQuestion).all()

def get_plant_question_by_id(db: Session, question_id: int):
    return db.query(models.PlantQuestion).filter(models.PlantQuestion.Id == question_id).first()


# Sessions de garde
def get_plant_guardings(db: Session):
    return db.query(models.PlantGuarding).all()

def get_plant_guarding_by_id(db: Session, guarding_id: int):
    return db.query(models.PlantGuarding).filter(models.PlantGuarding.Id == guarding_id).first()

####################################################################################
############ POST ##################################################################

# Questions
def create_plant_question(db: Session, question: schemas.PlantQuestionCreate, owner_id: int):
    db_question = models.PlantQuestion(**question.dict(), IdOwner=owner_id)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


# Sessions de garde
def create_plant_guarding(db: Session, guarding: schemas.PlantGuardingCreate, owner_id: int):
    db_guarding = models.PlantGuarding(**guarding.dict(), IdOwner=owner_id)
    db.add(db_guarding)
    db.commit()
    db.refresh(db_guarding)
    return db_guarding


# Utilisateurs
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    return db.query(models.User).filter(models.User.Email == email, models.User.Password == password).first()


# Messages
def create_message(db: Session, message: schemas.MessageCreate, sender_id: int, receiver_id: int):
    db_message = models.Message(**message.dict(), IdSender=sender_id, IdReceiver=receiver_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


####################################################################################
############ PUT ###################################################################

# Questions
def update_plant_question(db: Session, question_id: int, question: schemas.PlantQuestionCreate):
    db.query(models.PlantQuestion).filter(models.PlantQuestion.Id == question_id).update(question.dict())
    db.commit()
    return db.query(models.PlantQuestion).filter(models.PlantQuestion.Id == question_id).first()


# Sessions de garde
def update_plant_guarding(db: Session, guarding_id: int, guarding: schemas.PlantGuardingCreate):
    db.query(models.PlantGuarding).filter(models.PlantGuarding.Id == guarding_id).update(guarding.dict())
    db.commit()
    return db.query(models.PlantGuarding).filter(models.PlantGuarding.Id == guarding_id).first()


# Messages
def update_message(db: Session, message_id: int, message: schemas.MessageCreate):
    db.query(models.Message).filter(models.Message.Id == message_id).update(message.dict())
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
    db.query(models.PlantGuarding).filter(models.PlantGuarding.Id == guarding_id).delete()
    db.commit()


# Message
def delete_message(db: Session, message_id: int):
    db.query(models.Message).filter(models.Message.Id == message_id).delete()
    db.commit()