import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';
import PlantOptionSwitchButton from './PlantOptionSwitchButton';

interface User {
    Id: number;
    Name: string;
    Surname: string;
}

interface PlantGuarding {
    Id: number;
    Name: string;
    Description: string;
    Picture: string;
    DateStart: string;
    DateEnd: string | null;
    Location: string;
    IdOwner: number;
    IdGuard: number;
}

interface PlantQuestion {
    Id: number;
    Title: string;
    Content: string;
    DateSent: string;
    IdOwner: number;
}


interface Answer {
    Id: number;
    Content: string;
    DateSent: string;
    IdSender: number;
    IdQuestion: number; 
}

const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userGuardings, setUserGuardings] = useState<PlantGuarding[]>([]);
    const [userQuestions, setUserQuestions] = useState<PlantQuestion[]>([]);
    const [selectedGuarding, setSelectedGuarding] = useState<PlantGuarding | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<PlantQuestion | null>(null);
    const defaultUserId = 1; // L'ID de l'utilisateur par défaut
    const [owner, setOwner] = useState<User | null>(null);
    const [guardingDialogVisible, setGuardingDialogVisible] = useState(false);
    const [questionDialogVisible, setQuestionDialogVisible] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [answerContent, setAnswerContent] = useState('');
    const [senderInfo, setSenderInfo] = useState<{ name: string, surname: string } | null>(null);
    const [ownerGuardings, setOwnerGuardings] = useState<PlantGuarding[]>([]);
    const [selectedOwnerGuarding, setSelectedOwnerGuarding] = useState<PlantGuarding | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${defaultUserId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        

        const fetchUserGuardings = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/plantsGuarding?idGuard=${defaultUserId}`);
                setUserGuardings(response.data.filter((guarding: { IdGuard: number; }) => guarding.IdGuard === defaultUserId)); // Filtrer les gardes où l'utilisateur est Guard
            } catch (error) {
                console.error('Error fetching user guardings:', error);
            }
        };

        const fetchUserQuestions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/plantsQuestions?idOwner=${defaultUserId}`);
                setUserQuestions(response.data.filter((question: { IdOwner: number; }) => question.IdOwner === defaultUserId)); // Filtrer les questions où l'utilisateur est propriétaire
            } catch (error) {
                console.error('Error fetching user questions:', error);
            }
        };
        const fetchOwnerGuardings = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/plantsGuarding/owner/${defaultUserId}`);
                setOwnerGuardings(response.data.filter((guarding: { IdOwner: number; }) => guarding.IdOwner === defaultUserId)); // Filtrer les gardes où l'utilisateur est propriétaire
            } catch (error) {
                console.error('Error fetching owner guardings:', error);
            }
        };

        fetchOwnerGuardings();
        fetchUser();
        fetchUserGuardings();
        fetchUserQuestions();
    }, [defaultUserId]);

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
                showQuestionDialog(selectedQuestion);
            }
            console.log('Answer submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    const hideGuardingDialog = () => {
        setGuardingDialogVisible(false);
    };

    const showGuardingDialog = async (guarding: PlantGuarding) => {
        setSelectedGuarding(guarding);
        setGuardingDialogVisible(true);
        try {
            const guardOwner = await axios.get(`http://127.0.0.1:8000/api/users/${guarding.IdOwner}`);
            setOwner(guardOwner.data);
        } catch (error) {
            console.error('Error fetching owner:', error);
        }
    };
    
    const hideQuestionDialog = () => {
        setQuestionDialogVisible(false);
    };
    
    const showQuestionDialog = async (question: PlantQuestion) => {
        setSelectedQuestion(question);
        setQuestionDialogVisible(true);
        try {
            const responseAnswers = await axios.get(`http://127.0.0.1:8000/api/answers/${question.Id}`);
            setAnswers(responseAnswers.data);
    
            // Récupérer les informations de l'utilisateur associées à l'ID du sender de la réponse
            const senderId = responseAnswers.data[0]?.IdSender; // Supposons que la première réponse contient les informations sur le sender
            if (senderId) {
                const responseSender = await axios.get(`http://127.0.0.1:8000/api/users/${senderId}`);
                setSenderInfo({ name: responseSender.data.Name, surname: responseSender.data.Surname });
            }
        } catch (error) {
            console.error('Error fetching answers:', error);
            setAnswers([]);
        }
    };

    return (
        <div><NavigationBar />
        <div className="container p-4">
            {user && (
                <div>
                    <h1 className="text-3xl text-green-900 text-center mb-8">Bonjour {user.Name} {user.Surname}</h1>
                </div>
            )}
            <div className='flex justify-center  buttonContainer'>
                <Link to="/edit-user">
                    <button className="bg-green-900 text-white border border-green-900 rounded-full py-2 px-6 mr-4 hover:bg-green-800 hover:border-green-800">Modifier profil</button>
                </Link>
                <Link to="/login">
                    <button className="bg-red-900 text-white rounded-full py-2 px-6 hover:bg-red-800">Déconnexion</button>
                </Link>
            </div>
            <br/>



            <h2 className="text-xl text-green-900 mb-4">Sessions de garde créées</h2>
            <div className="flex flex-col gap-4">
                {ownerGuardings.length === 0 ? ( <p>Vous n'avez pas créé de sessions de garde.</p> ) : (
                    <div className="flex flex-col gap-4">
                        {ownerGuardings.map((guarding) => (
                            <Card
                                key={guarding.Id}
                                className="p-4 cursor-pointer"
                                onClick={() => showGuardingDialog(guarding)}
                                style={{ borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                            >
                                <h3>{guarding.Name}</h3>
                                <p>Débute: {guarding.DateStart} - Finit: {guarding.DateEnd ? guarding.DateEnd : 'En cours'}</p>
                                <p>Localisation: {guarding.Location}</p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Dialog visible={guardingDialogVisible} onHide={hideGuardingDialog} className="bg-white p-4" style={{ width: '90vw', borderRadius: '15px', height: '50vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedGuarding && (
                    <div className='flex flex-col justify-around h-full items-center'>
                        <h2 className="text-3xl mb-4">{selectedGuarding.Name}</h2>
                        <p className="text-lg">Description: {selectedGuarding.Description}</p>
                        <p>Débute: {selectedGuarding.DateStart} - Finit: {selectedGuarding.DateEnd ? selectedGuarding.DateEnd : 'En cours'}</p>
                        <p>Localisation: {selectedGuarding.Location}</p>
                        {owner && (
                            <div>
                                <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800 mr-4">Discussion</button>
                            </div>
                        )}
                        <button className="bg-red-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-red-800">Annuler la garde</button>
                    </div>
                )}
            </Dialog>
            <br/>
            <h2 className="text-xl text-green-900 mb-4">Liste des plantes que vous gardez</h2>
            <div className="flex flex-col gap-4">
                {userGuardings.length === 0 ? ( <p>Vous ne gardez pas de plantes.</p> ) : (
                    <div className="flex flex-col gap-4">
                        {userGuardings.map((guarding) => (
                            <Card
                                key={guarding.Id}
                                className="p-4 cursor-pointer"
                                onClick={() => showGuardingDialog(guarding)}
                                style={{ borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                            >
                                <h3>{guarding.Name}</h3>
                                <p>Débute: {guarding.DateStart} - Finit: {guarding.DateEnd ? guarding.DateEnd : 'En cours'}</p>
                                <p>Localisation: {guarding.Location}</p>
                                {owner && (
                                    <p>Propriétaire: {owner.Name} {owner.Surname}</p>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Dialog visible={guardingDialogVisible} onHide={hideGuardingDialog} className="bg-white p-4" style={{ width: '90vw', borderRadius: '15px', height: '50vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedGuarding && (
                    <div className='flex flex-col justify-around h-full items-center'>
                        <h2 className="text-3xl mb-4">{selectedGuarding.Name}</h2>
                        <p className="text-lg">Description: {selectedGuarding.Description}</p>
                        <p>Débute: {selectedGuarding.DateStart} - Finit: {selectedGuarding.DateEnd ? selectedGuarding.DateEnd : 'En cours'}</p>
                        <p>Localisation: {selectedGuarding.Location}</p>
                        {owner && (
                            <div>
                                <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800 mr-4">Discussion avec {owner.Name} {owner.Surname}</button>
                            </div>
                        )}
                        <button className="bg-red-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-red-800">Annuler la garde</button>
                    </div>
                )}
            </Dialog>
            <br/>
            <h2 className="text-xl text-green-900 mb-4">Questions posées</h2>
            <div className="flex flex-col gap-4">
                {userGuardings.length === 0 ? ( <p>Vous n'avez pas posé de question.</p> ) : (
                    <div className="flex flex-col gap-4">
                        {userQuestions.map((question) => (
                            <Card
                                key={question.Id}
                                className="p-4 cursor-pointer"
                                onClick={() => showQuestionDialog(question)}
                                style={{ borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                            >
                                <h3>{question.Title}</h3>
                                <p>Date: {question.DateSent}</p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Dialog visible={questionDialogVisible} onHide={hideQuestionDialog} className="bg-white p-4" style={{ width: '90vw', borderRadius: '15px', height: '90vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedQuestion && (
                    <div className='flex flex-col justify-around '>
                        <p className="mt-4 text-sm">Date: {selectedQuestion.DateSent}</p>
                        <h3 className="text-xl mb-4">{selectedQuestion.Title}</h3>
                        <p>{selectedQuestion.Content}</p>
                        {answers.length > 0 ? (
                            <div className="mt-4">
                                <br/>
                                <h2 className="mb-2 text-lg">Réponses :</h2>
                                {answers.map((answer) => (
                                    <div key={answer.Id} className="mb-2">
                                        <p>{answer.Content}</p>
                                        {senderInfo && (
                                            <p className="text-sm">Réponse par : {senderInfo.name} {senderInfo.surname}</p>
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

export default Home;