import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddPlantToGuard: React.FC = () => {
    const defaultUserId = 1; // L'ID de l'utilisateur par défaut
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        dateStart: new Date(),
        dateEnd: new Date(),
        location: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date, field: string) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/plantsGuarding?owner_id=${defaultUserId}`, {
                Picture: '',
                Name: formData.name,
                Description: formData.description,
                DateStart: formData.dateStart.toISOString().split('T')[0],
                DateEnd: formData.dateEnd.toISOString().split('T')[0],
                Location: formData.location,
            });
            console.log(response.data);
            // Réinitialiser les champs après l'envoi réussi
            setFormData({
                name: '',
                description: '',
                dateStart: new Date(),
                dateEnd: new Date(),
                location: '',
            });
            setErrorMessage('');
        } catch (error: any) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                setErrorMessage('Une erreur s\'est produite lors de l\'ajout de la session de garde.');
            } else {
                console.error('Request setup error:', error.message);
                setErrorMessage('Erreur de configuration de la requête. Veuillez réessayer.');
            }
        }
    };

    return (
        <div >
            <NavigationBar />
            <div className="bg-white p-8 rounded-t-3xl text-center w-full flex flex-col flex-wrap justify-center h-full shadow-lg">
                    <h1 className="text-3xl text-green-900 mb-6">Ajouter une session de garde</h1>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2">Nom de la session:</label>
                            <input type="text" id="name" name="name" className="border border-gray-300 rounded-md p-2 w-full" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2">Description:</label>
                            <textarea id="description" name="description" rows={4} className="border border-gray-300 rounded-md p-2 w-full" value={formData.description} onChange={handleChange} required></textarea>
                        </div>
                        <div>
                            <label htmlFor="dateStart" className="block mb-2">Date de début:</label>
                            <DatePicker id="dateStart" selected={formData.dateStart} onChange={(date) => handleDateChange(date as Date, 'dateStart')} className="border border-gray-300 rounded-md p-2 w-full" />
                        </div>
                        <div>
                            <label htmlFor="dateEnd" className="block mb-2">Date de fin:</label>
                            <DatePicker id="dateEnd" selected={formData.dateEnd} onChange={(date) => handleDateChange(date as Date, 'dateEnd')} className="border border-gray-300 rounded-md p-2 w-full" />
                        </div>
                        <div>
                            <label htmlFor="location" className="block mb-2">Localisation:</label>
                            <input type="text" id="location" name="location" className="border border-gray-300 rounded-md p-2 w-full" value={formData.location} onChange={handleChange} required />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="bg-green-900 text-white rounded-full py-2 px-6 hover:bg-green-800">
                                Ajouter
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default AddPlantToGuard;
