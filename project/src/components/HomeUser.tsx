import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Plant {
  id: number;
  name: string;
  // Autres propriétés de la plante
}

interface Question {
  id: number;
  title: string;
  // Autres propriétés de la question
}

const HomeUser: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fonction pour récupérer les plantes en garde de l'utilisateur connecté
    const fetchPlants = async () => {
      try {
        const response = await axios.get<Plant[]>('http://127.0.0.1:8000/api/user-plants-in-guard');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    // Fonction pour récupérer les questions de l'utilisateur connecté
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>('http://127.0.0.1:8000/api/user-questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchPlants();
    fetchQuestions();
  }, []); // Appel uniquement au chargement initial

  return (
    <div>
      <h1>Plantes en garde</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>{plant.name}</li>
          // Afficher d'autres détails de la plante si nécessaire
        ))}
      </ul>

      <h1>Questions posées</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.title}</li>
          // Afficher d'autres détails de la question si nécessaire
        ))}
      </ul>
    </div>
  );
};

export default HomeUser;
