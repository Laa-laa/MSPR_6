import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';

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
    IdOwner: number; // Ajouter l'ID du propriétaire
}

const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userGuardings, setUserGuardings] = useState<PlantGuarding[]>([]);
    const [selectedGuarding, setSelectedGuarding] = useState<PlantGuarding | null>(null);
    const defaultUserId = 1; // L'ID de l'utilisateur par défaut
    const [visible, setVisible] = useState(false);
    const [owner, setOwner] = useState<User | null>(null);

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
                setUserGuardings(response.data);
            } catch (error) {
                console.error('Error fetching user guardings:', error);
            }
        };

        fetchUser();
        fetchUserGuardings();
    }, [defaultUserId]);

    const hideDialog = () => {
        setVisible(false);
    };

    const showDialog = async (guarding: PlantGuarding) => {
        setSelectedGuarding(guarding);
        setVisible(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${guarding.IdOwner}`);
            setOwner(response.data);
        } catch (error) {
            console.error('Error fetching owner:', error);
        }
    };

    return (
        <div className="container p-4">
            <button className="bg-green-900 text-white rounded-full py-1 px-4 mt-4 absolute top-0 left-0 m-2" onClick={() => window.history.back()}>Retour</button>
            <br/>
            <br/>
            {user && (
                <div>
                    <h1 className="text-3xl text-green-900 text-center mb-8">Bonjour {user.Name} {user.Surname}</h1>
                </div>
            )}
            <h2 className="text-xl text-green-900 mb-4">Liste des gardes</h2>
            <div className="flex flex-col gap-4">
                {userGuardings.map((guarding) => (
                    <Card
                        key={guarding.Id}
                        className="p-4 cursor-pointer"
                        onClick={() => showDialog(guarding)}
                        style={{ borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                    >
                        <h3>{guarding.Name}</h3>
                        <p>Débute: {guarding.DateStart} - Fini: {guarding.DateEnd ? guarding.DateEnd : 'En cours'}</p>
                        <p>Localisation: {guarding.Location}</p>
                    </Card>
                ))}
            </div>
            <Dialog visible={visible} onHide={hideDialog} className="bg-white p-4" style={{ width: '90vw', borderRadius: '15px', height: '50vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedGuarding && (
                    <div className='flex flex-col justify-around h-full items-center'>
                        <h2 className="text-3xl mb-4">{selectedGuarding.Name}</h2>
                        <p className="text-lg">Description: {selectedGuarding.Description}</p>
                        <p>Débute: {selectedGuarding.DateStart} - Fini: {selectedGuarding.DateEnd ? selectedGuarding.DateEnd : 'En cours'}</p>
                        <p>Localisation: {selectedGuarding.Location}</p>
                        <button className="bg-red-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-red-800">Annuler la garde</button>
                        {owner && (
                            <div>
                                <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800">Envoyer un message à {owner.Name} {owner.Surname}</button>
                            </div>
                        )}
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default Home;
