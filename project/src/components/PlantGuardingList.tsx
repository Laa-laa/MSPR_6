import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PlantOptionSwitchButton from './PlantOptionSwitchButton';

interface PlantGuarding {
    Id: number;
    Name: string;
    Description: string;
    Picture: string;
    DateStart: string;
    DateEnd: string | null;
    Location: string;
}

const PlantGuardingList: React.FC = () => {
    const [guardings, setGuardings] = useState<PlantGuarding[]>([]);
    const [filteredGuardings, setFilteredGuardings] = useState<PlantGuarding[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchLocation, setSearchLocation] = useState('');

    useEffect(() => {
        const fetchGuardings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plantsGuarding');
                setGuardings(response.data);
                setFilteredGuardings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching guardings:', error);
                setLoading(false);
            }
        };

        fetchGuardings();
    }, []);

    useEffect(() => {
        filterGuardings();
    }, [startDate, endDate, searchLocation, guardings]);

    const filterGuardings = () => {
        let filtered = [...guardings];

        if (searchLocation.trim() !== '') {
            filtered = filtered.filter((guarding) => guarding.Location.toLowerCase().includes(searchLocation.toLowerCase()));
        }

        if (startDate && endDate) {
            filtered = filtered.filter((guarding) => {
                const guardingStartDate = new Date(guarding.DateStart);
                const guardingEndDate = guarding.DateEnd ? new Date(guarding.DateEnd) : null;
                return guardingStartDate >= startDate && (!guardingEndDate || guardingEndDate <= endDate);
            });
        }

        setFilteredGuardings(filtered);
    };

    return (
        <div className="container p-4">
            <button className="bg-green-900 text-white rounded-full py-1 px-4 mt-4 absolute top-0 left-0 m-2" onClick={() => window.history.back()}>Retour</button>
            <br/>
            <br/>
            <h1 className="text-3xl text-green-900 text-center mb-8">Demandes de gardiennage</h1>
            <div className="flex justify-center mb-4">
                <input
                        type="text"
                        placeholder="Ville"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mr-1"
                    />
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        placeholderText="Date de début"
                        className="border border-gray-300 rounded-md p-2 mr-1"
                    />
                </div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        placeholderText="Date de fin"
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {filteredGuardings.map((guarding) => (
                    <Card key={guarding.Id} className="mb-4" style={{ borderRadius: '15px', maxHeight: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                        <div className="flex">
                            <div className="w-2/3 flex flex-col justify-between flex-grow p-2 justify-between bg-customGreen" style={{ borderRadius: '0 15px 15px 0' }}>
                                <h3 className='text-white'>{guarding.Name}</h3>
                                <p className='text-white text-s'>Débute: {guarding.DateStart} Fini: {guarding.DateEnd}</p>
                                <p className='text-white text-s'>Localisation: {guarding.Location}</p>
                                <p className='text-white text-xs'>{guarding.Description.slice(0, 20)}{guarding.Description.length > 20 ? '...' : ''}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <PlantOptionSwitchButton />
        </div>
    );
};

export default PlantGuardingList;
