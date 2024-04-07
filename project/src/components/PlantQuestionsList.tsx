import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import PlantOptionSwitchButton from './PlantOptionSwitchButton';

interface Question {
    Id: number;
    Title: string;
    Content: string;
    DateSent: string;
}

export default function PlantQuestionsList() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plantsQuestions');
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Filtrer les questions en fonction du terme de recherche
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredQuestions(questions);
        } else {
            const filtered = questions.filter((question) => {
                return (
                    question.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    question.Content.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setFilteredQuestions(filtered);
        }
    }, [searchTerm, questions]);

    const openModal = (question: Question) => {
        setSelectedQuestion(question);
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        <div className="container p-4">
            <button className="bg-green-900 text-white rounded-full py-1 px-4 mt-4 absolute top-0 left-0 m-2" onClick={() => window.history.back()}>Retour</button>
            <h1 className="text-3xl text-green-900 text-center mb-8">Questions posées</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full max-w-md"
                />
            </div>
            <div className="flex flex-col gap-4">
                {filteredQuestions.map((question) => (
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
