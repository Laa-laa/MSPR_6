import unittest
from sqlalchemy.orm import Session
from ..backend import crud, models, schemas
from ..backend.database import SessionLocal, engine
from datetime import date

class TestCRUD(unittest.TestCase):
    def setUp(self):
        # Crée une session de base de données pour les tests
        self.db = SessionLocal()
        # Crée toutes les tables dans la base de données
        models.Base.metadata.create_all(bind=engine)

    def tearDown(self):
        # Ferme la session de base de données après les tests
        self.db.close()

    def test_create_user(self):
        # Créer un utilisateur factice pour le test
        user_data = schemas.UserCreate(
            Name="John",
            Surname="Doe",
            Email="john@example.com",
            Password="password123",
            IsBotanist=True,
            Birthday=date(1990, 1, 1)
        )
        # Appeler la fonction de création d'utilisateur dans crud.py
        created_user = crud.create_user(self.db, user_data)
        # Vérifier si l'utilisateur a été créé avec succès
        self.assertIsNotNone(created_user.Id)
        self.assertEqual(created_user.Name, user_data.Name)
        self.assertEqual(created_user.Surname, user_data.Surname)
        self.assertEqual(created_user.Email, user_data.Email)
        self.assertTrue(created_user.IsBotanist)
        self.assertEqual(created_user.Birthday, user_data.Birthday)

    def test_get_user(self):
        # Créer un utilisateur factice pour le test
        user_data = schemas.UserCreate(
            Name="Jane",
            Surname="Doe",
            Email="jane@example.com",
            Password="password456",
            IsBotanist=False,
            Birthday=date(1980, 1, 1)
        )
        # Ajouter l'utilisateur à la base de données pour le test
        created_user = crud.create_user(self.db, user_data)
        # Récupérer l'utilisateur de la base de données en utilisant son ID
        retrieved_user = crud.get_user(self.db, created_user.Id)
        # Vérifier si l'utilisateur récupéré correspond à l'utilisateur créé
        self.assertEqual(retrieved_user.Name, user_data.Name)
        self.assertEqual(retrieved_user.Surname, user_data.Surname)
        self.assertEqual(retrieved_user.Email, user_data.Email)
        self.assertFalse(retrieved_user.IsBotanist)
        self.assertEqual(retrieved_user.Birthday, user_data.Birthday)

if __name__ == '__main__':
    unittest.main()
