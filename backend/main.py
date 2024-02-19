from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dépendance pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




@app.post("/api/users/signin")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.create_user(db, user)
    return db_user

# @app.post("/api/users/login")
# def login_user(email: str, password: str, db: Session = Depends(get_db)):
#     user = crud.authenticate_user(db, email, password)
#     if not user:
#         raise HTTPException(status_code=400, detail="Invalid credentials")
#     # Générez ici votre token JWT ou gérer l'authentification de session
#     return {"user_id": user.Id, "email": user.Email}

@app.post("/api/users/login")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    # Generate JWT token
    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crud.create_access_token(
        data={"sub": user.Email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}




# GET /api/plantsQuestions
@app.get("/api/plantsQuestions")
def read_plant_questions(db: Session = Depends(get_db)):
    return crud.get_plant_questions(db)

# GET /api/plantsQuestions/:id
@app.get("/api/plantsQuestions/{question_id}")
def read_plant_question(question_id: int, db: Session = Depends(get_db)):
    question = crud.get_plant_question_by_id(db, question_id)
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return question

# GET /api/plantsGuarding
@app.get("/api/plantsGuarding")
def read_plant_guardings(db: Session = Depends(get_db)):
    return crud.get_plant_guardings(db)

# GET /api/plantsGuarding/:id
@app.get("/api/plantsGuarding/{guarding_id}")
def read_plant_guarding(guarding_id: int, db: Session = Depends(get_db)):
    guarding = crud.get_plant_guarding_by_id(db, guarding_id)
    if guarding is None:
        raise HTTPException(status_code=404, detail="Guarding session not found")
    return guarding

# POST /api/plantsQuestions
@app.post("/api/plantsQuestions")
def create_plant_question(question: schemas.PlantQuestionCreate, owner_id: int, db: Session = Depends(get_db)):
    return crud.create_plant_question(db, question, owner_id)

# POST /api/plantsGuarding
@app.post("/api/plantsGuarding")
def create_plant_guarding(guarding: schemas.PlantGuardingCreate, owner_id: int, db: Session = Depends(get_db)):
    return crud.create_plant_guarding(db, guarding, owner_id)

# # POST /api/users/signin
# @app.post("/api/users/signin")
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     return crud.create_user(db, user)

# POST /api/message/:IdSender:IdReceiver
@app.post("/api/message/{sender_id}/{receiver_id}")
def create_message(sender_id: int, receiver_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)):
    return crud.create_message(db, message, sender_id, receiver_id)

# PUT /api/plantsQuestions/:id
@app.put("/api/plantsQuestions/{question_id}")
def update_plant_question(question_id: int, question: schemas.PlantQuestionCreate, db: Session = Depends(get_db)):
    return crud.update_plant_question(db, question_id, question)

# PUT /api/plantsGuarding/:id
@app.put("/api/plantsGuarding/{guarding_id}")
def update_plant_guarding(guarding_id: int, guarding: schemas.PlantGuardingCreate, db: Session = Depends(get_db)):
    return crud.update_plant_guarding(db, guarding_id, guarding)

# PUT /api/messages/:id
@app.put("/api/messages/{message_id}")
def update_message(message_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)):
    return crud.update_message(db, message_id, message)

# DELETE /api/users/:id
@app.delete("/api/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return crud.delete_user(db, user_id)

# DELETE /api/plantsGuarding/:id
@app.delete("/api/plantsGuarding/{guarding_id}")
def delete_plant_guarding(guarding_id: int, db: Session = Depends(get_db)):
    return crud.delete_plant_guarding(db, guarding_id)

# DELETE /api/message/:id
@app.delete("/api/message/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    return crud.delete_message(db, message_id)
