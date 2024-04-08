import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__),
                                              '..')))
from fastapi.testclient import TestClient
from backend import main

client = TestClient(main.app)

def test_read_plant_questions():
    response = client.get("/api/plantsQuestions")
    assert response.status_code == 200
    assert response.json() == []

