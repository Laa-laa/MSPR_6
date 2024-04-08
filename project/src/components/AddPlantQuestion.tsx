import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';

const AddPlantQuestion: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/plantsQuestions?owner_id=1', {
        Picture: '', // Remplacer par l'image si nécessaire
        Title: title,
        Content: content,
        DateSent: new Date().toISOString().split('T')[0], // Date actuelle
      });
      console.log(response.data);
      // Réinitialiser les champs après l'envoi réussi
      setTitle('');
      setContent('');
      setErrorMessage('');
    } catch (error: any) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        setErrorMessage('Une erreur s\'est produite lors de la création de la question.');
      } else {
        console.error('Request setup error:', error.message);
        setErrorMessage('Erreur de configuration de la requête. Veuillez réessayer.');
      }
    }
  };

  return (
    <div><NavigationBar />
      <div className="bg-white p-8 rounded-t-3xl text-center w-full flex flex-col flex-wrap justify-center h-full shadow-lg">
        <div className="addPlantQuestionHeader mb-8">
          <h1 className="text-3xl text-green-900">Poser une question</h1>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form className="addPlantQuestionForm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block">Titre :</label>
            <input type="text" id="title" name="title" className="border border-gray-300 rounded-md p-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block">Description :</label>
            <textarea id="description" name="description" rows={4} className="border border-gray-300 rounded-md p-2 w-full" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block">Ajouter une photo :</label>
            <input type="file" id="image" name="image" accept="image/*" className="border border-gray-300 rounded-md p-2" />
          </div>
          <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800" type="submit">Demander conseil</button>
        </form>
        <button className="bg-green-900 text-white rounded-full py-1 px-4 mt-4 m-2" onClick={() => window.history.back()}>Retour</button>
      </div>
    </div>
  );
};

export default AddPlantQuestion;
