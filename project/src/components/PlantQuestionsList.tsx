import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';


export default function PlantQuestionsList() {
    const [questions, setQuestions] = useState<{ Id: number; Title: string, Content: string, DateSent: string }[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plantsQuestions', {
                    headers: {
                      'accept': 'application/json'
                    }
                  });
                console.log(response)
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);
    return (
        <div className="container p-4"> 
            <h2 className="container p-4">Dernières questions posées par nos plant lovers</h2>
            <div className="card flex justify-center" style={{ maxHeight: '500px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                {questions.map((question) => (
                    <Card key={question.Id} className="md:w-25rem" style={{ borderRadius: '15px', maxHeight: '100%' }}>
                        <div className="flex">
                            <div className="w-1/3 overflow-hidden" style={{ borderRadius: '15px 0 0 15px' }}>
                                <img src={process.env.PUBLIC_URL + '/pexels-scott-webb-1022922.jpg'} alt="plant" className="w-full h-full object-cover" style={{ minWidth: '100%' }} />
                            </div>
                            <div className="w-2/3 flex flex-col justify-between flex-grow p-2 justify-between bg-customGreen" style={{ borderRadius: '0 15px 15px 0' }}>
                                <h3 className='text-white'>{question.Title}</h3>
                                <p className='text-white'>{question.Content}</p>
                                <p className='text-white text-xs'>Date: {question.DateSent}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}