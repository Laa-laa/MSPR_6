from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from jose import JWTError, jwt

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Configure CORS settings to allow frontend urls access
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Dépendance pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30





# Endpoint to create a new answer
@app.post("/answers/", response_model=schemas.Answer)
def create_answer(answer: schemas.AnswerCreate, sender_id: int, question_id: int, db: Session = Depends(get_db)):
    return crud.create_answer(db=db, answer=answer, sender_id=sender_id, question_id=question_id)

# Endpoint to get all answers for a question
@app.get("/answers/{question_id}", response_model=list[schemas.Answer])
def read_answers(question_id: int, db: Session = Depends(get_db)):
    answers = crud.get_answers(db=db, question_id=question_id)
    if not answers:
        raise HTTPException(status_code=404, detail="Answers not found")
    return answers





async def get_current_user(token: str = Depends(oauth2_scheme)):
    # Remplacez la logique de décodage du token JWT par une simple vérification de l'ID de l'utilisateur
    # Assurez-vous que le token est valide, puis renvoyez l'ID de l'utilisateur par défaut (ici, 1)
    return 1  # Retourne toujours l'ID de l'utilisateur 1 par défaut

# Fonction pour vérifier le token JWT et récupérer les informations d'identification de l'utilisateur
# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id: int = payload.get("user_id")
#         if user_id is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     return user_id


# Endpoint protégé nécessitant une authentification
@app.delete("/api/users/{user_id}")
async def delete_user(
    user_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Vérifiez si l'utilisateur courant est autorisé à supprimer le compte utilisateur
    if current_user != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this user",
        )
    # Si l'utilisateur est autorisé, supprimez le compte utilisateur
    return crud.delete_user(db, user_id)


@app.post("/api/users/signin")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.create_user(db, user)
    return db_user


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


# PUT /api/plantsGuarding/:id
@app.put("/api/plantsGuarding/{guarding_id}")
def update_plant_guarding(
    guarding_id: int,
    guarding: schemas.PlantGuardingCreate,
    db: Session = Depends(get_db),
):
    return crud.update_plant_guarding(db, guarding_id, guarding)


# DELETE /api/plantsGuarding/:id
@app.delete("/api/plantsGuarding/{guarding_id}")
def delete_plant_guarding(guarding_id: int, db: Session = Depends(get_db)):
    return crud.delete_plant_guarding(db, guarding_id)


# POST /api/plantsQuestions
@app.post("/api/plantsQuestions")
def create_plant_question(
    question: schemas.PlantQuestionCreate, owner_id: int, db: Session = Depends(get_db)
):
    return crud.create_plant_question(db, question, owner_id)


# POST /api/plantsGuarding
@app.post("/api/plantsGuarding")
def create_plant_guarding(
    guarding: schemas.PlantGuardingCreate, owner_id: int, db: Session = Depends(get_db)
):
    return crud.create_plant_guarding(db, guarding, owner_id)


# # POST /api/users/signin
# @app.post("/api/users/signin")
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     return crud.create_user(db, user)


# POST /api/message/:IdSender:IdReceiver
@app.post("/api/message/{sender_id}/{receiver_id}")
def create_message(
    sender_id: int,
    receiver_id: int,
    message: schemas.MessageCreate,
    db: Session = Depends(get_db),
):
    return crud.create_message(db, message, sender_id, receiver_id)


# PUT /api/plantsQuestions/:id
@app.put("/api/plantsQuestions/{question_id}")
def update_plant_question(
    question_id: int,
    question: schemas.PlantQuestionCreate,
    db: Session = Depends(get_db),
):
    return crud.update_plant_question(db, question_id, question)


# PUT /api/plantsGuarding/:id
@app.put("/api/plantsGuarding/{guarding_id}")
def update_plant_guarding(
    guarding_id: int,
    guarding: schemas.PlantGuardingCreate,
    db: Session = Depends(get_db),
):
    return crud.update_plant_guarding(db, guarding_id, guarding)


# PUT /api/messages/:id
@app.put("/api/messages/{message_id}")
def update_message(
    message_id: int, message: schemas.MessageCreate, db: Session = Depends(get_db)
):
    return crud.update_message(db, message_id, message)


# # DELETE /api/users/:id
# @app.delete("/api/users/{user_id}")
# def delete_user(user_id: int, db: Session = Depends(get_db)):
#     return crud.delete_user(db, user_id)


# DELETE /api/plantsGuarding/:id
@app.delete("/api/plantsGuarding/{guarding_id}")
def delete_plant_guarding(guarding_id: int, db: Session = Depends(get_db)):
    return crud.delete_plant_guarding(db, guarding_id)


# DELETE /api/message/:id
@app.delete("/api/message/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    return crud.delete_message(db, message_id)
