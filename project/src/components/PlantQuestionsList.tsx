import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PlantOptionSwitchButton from './PlantOptionSwitchButton'; // Assurez-vous d'importer correctement le chemin du composant PlantOptionSwitchButton

interface Question {
    Id: number;
    Title: string;
    Content: string;
    DateSent: string;
}

export default function PlantQuestionsList() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plantsQuestions');
                console.log(response.data); // Log received data
                setQuestions(response.data);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchQuestions();
    }, []);

    // Function to handle opening the modal and setting the selected question
    const openModal = (question: Question) => {
        setSelectedQuestion(question);
        setVisible(true);
    };

    // Function to handle closing the modal
    const hideModal = () => {
        setVisible(false);
    };

    return (
        <div className="container p-4"> 
            <button className="bg-green-900 text-white rounded-full py-1 px-4 mt-4 absolute top-0 left-0 m-2" onClick={() => window.history.back()}>Retour</button>
            <br />
            <br />
            <h1 className="text-3xl text-green-900 text-center mb-8">Questions posées</h1>
            <Link to="/add-plant-question">
                <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800 ">Ajouter une question</button>
            </Link>
            <br />
            <br />
            <div className="flex flex-col gap-4">
                {questions.map((question) => (
                    <Card key={question.Id} className="mb-4" style={{ borderRadius: '15px', maxHeight: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }} onClick={() => openModal(question)}>
                        <div className="flex">
                            <div className="w-1/3 overflow-hidden" style={{ borderRadius: '15px 0 0 15px' }}>
                                <img src={process.env.PUBLIC_URL + '/pexels-scott-webb-1022922.jpg'} alt="plant" className="w-full h-full object-cover" style={{ minWidth: '100%' }} />
                            </div>
                            <div className="w-2/3 flex flex-col justify-between flex-grow p-2 justify-between bg-customGreen" style={{ borderRadius: '0 15px 15px 0' }}>
                                <h3 className='text-white'>{question.Title}</h3>
                                <p className='text-white text-s'>{question.Content.slice(0, 20)}{question.Content.length > 20 ? '...' : ''}</p>
                                <p className='text-white text-xs'>Date: {question.DateSent}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <Dialog visible={visible} onHide={hideModal} className="bg-white p-6" style={{ width: '90vw', borderRadius: '15px', height: '90vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedQuestion && (
                    <div className='flex flex-col justify-around h-full'>
                        <h3>{selectedQuestion.Title}</h3>
                        <p>{selectedQuestion.Content}</p>
                        <p>Date: {selectedQuestion.DateSent}</p>
                    </div>
                )}
            </Dialog>
            <PlantOptionSwitchButton />
        </div>
    );
}
