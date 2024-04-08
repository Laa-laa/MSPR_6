import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import PlantOptionSwitchButton from './PlantOptionSwitchButton';
import NavigationBar from './NavigationBar';

interface Question {
    Id: number;
    Title: string;
    Content: string;
    DateSent: string;
    IdOwner :number;
}

interface Answer {
    Id: number;
    Content: string;
    DateSent: string;
    IdSender: number;
    IdQuestion: number; 
}

const PlantQuestionsList: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [answerContent, setAnswerContent] = useState('');
    const [senderInfo, setSenderInfo] = useState<{ name: string, surname: string } | null>(null);
    const defaultUserId = 1;
    const [questionOwnerInfo, setQuestionOwnerInfo] = useState<{ name: string, surname: string } | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plantsQuestions');
                setQuestions(response.data);
                setFilteredQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const openModal = async (question: Question) => {
        setSelectedQuestion(question);
        setVisible(true);
        try {
            const responseAnswers = await axios.get(`http://127.0.0.1:8000/api/answers/${question.Id}`);
            setAnswers(responseAnswers.data);
    
            const senderId = responseAnswers.data[0]?.IdSender;
            if (senderId) {
                const responseSender = await axios.get(`http://127.0.0.1:8000/api/users/${senderId}`);
                setSenderInfo({ name: responseSender.data.Name, surname: responseSender.data.Surname });
            }
    
            // Récupérer les informations de l'utilisateur associées à l'ID du propriétaire de la question
            const ownerId = question.IdOwner;
            if (ownerId) {
                const responseOwner = await axios.get(`http://127.0.0.1:8000/api/users/${ownerId}`);
                setQuestionOwnerInfo({ name: responseOwner.data.Name, surname: responseOwner.data.Surname });
            }
        } catch (error) {
            console.error('Error fetching answers:', error);
            setAnswers([]);
        }
    };
    

    const hideModal = () => {
        setVisible(false);
    };

    const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/answers/?sender_id=${defaultUserId}&question_id=${selectedQuestion?.Id}`,
                {
                    Content: answerContent,
                    DateSent: new Date().toISOString().split('T')[0], // Format de date ISO 8601 (YYYY-MM-DD)
                    Picture: null // Vous pouvez remplacer null par l'URL de l'image si nécessaire
                }
            );
    
            if (selectedQuestion) {
                openModal(selectedQuestion);
            }
            console.log('Answer submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };
    
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
    
    useEffect(() => {
        // Trier les questions de la plus récente à la plus ancienne
        const sortedQuestions = [...filteredQuestions].sort((a, b) => {
            return new Date(b.DateSent).getTime() - new Date(a.DateSent).getTime();
        });
        setFilteredQuestions(sortedQuestions);
    }, [filteredQuestions]);
    

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

    return (
        <div> <NavigationBar />
            <div className="container p-4">
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
                <div className="flex justify-center mb-4">
                    <Link to="/add-plant-question">
                        <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800 ">Ajouter une question</button>
                    </Link>
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
                <Dialog visible={visible} onHide={hideModal} className="bg-white p-4" style={{ width: '90vw', borderRadius: '15px', height: '90vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedQuestion && (
                    <div className='flex flex-col h-full'>
                        <div>
                            <p className="mt-4 text-xs">Date: {selectedQuestion.DateSent}</p>
                            <h3 className="text-xl">{selectedQuestion.Title}</h3>
                            {questionOwnerInfo && (
                                <p className="text-sm mb-4">de : {questionOwnerInfo.name} {questionOwnerInfo.surname}</p>
                            )}
                        </div>
                        <p className="mb-4">{selectedQuestion.Content}</p>
                        {answers.length > 0 ? (
                            <div className="mt-4">
                                <h2 className="mb-2 text-lg">Réponses :</h2>
                                {answers.map((answer) => (
                                    <div key={answer.Id} className="mb-2">
                                        <p>{answer.Content}</p>
                                        {senderInfo && (
                                            <p className="text-sm">Réponce par : {senderInfo.name} {senderInfo.surname}</p>
                                        )}
                                        <p className="text-xs">Date: {answer.DateSent}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-4">Aucune réponse pour le moment.</p>
                        )}
                        <form onSubmit={submitAnswer} className="mt-4">
                            <div className="mb-2">
                                <label htmlFor="answerContent" className="block mb-1">Votre réponse :</label>
                                <textarea id="answerContent" value={answerContent} onChange={(e) => setAnswerContent(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2" rows={4}></textarea>
                            </div>
                            <button type="submit" className="bg-green-900 text-white border border-green-900 rounded-full py-2 px-6 mr-4 hover:bg-green-800 hover:border-green-800">Envoyer</button>
                        </form>
                    </div>
                )}
                </Dialog>
                <PlantOptionSwitchButton />
            </div>
        </div>
    );
};

export default PlantQuestionsList;