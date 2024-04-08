import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PlantOptionSwitchButton from './PlantOptionSwitchButton';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import NavigationBar from './NavigationBar';

interface PlantGuarding {
    Id: number;
    Name: string;
    IdGuard : number,
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
    const [selectedGuarding, setSelectedGuarding] = useState<PlantGuarding | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        const fetchGuardings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plantsGuarding');
                const guardingsWithNoGuard = response.data.filter((guarding: PlantGuarding) => !guarding.IdGuard);
                setGuardings(guardingsWithNoGuard);
                setFilteredGuardings(guardingsWithNoGuard);
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

    const showGuardingDialog = (guarding: PlantGuarding) => {
        setSelectedGuarding(guarding);
        setDialogVisible(true);
    };

    const hideGuardingDialog = () => {
        setDialogVisible(false);
    };

    const handleRegisterAsGuardian = async () => {
        // Handle registration logic here
        // Example:
        if (selectedGuarding) {
            console.log('Registered as guardian for:', selectedGuarding);
            // Send request to your API to register as guardian for selectedGuarding
        }
        hideGuardingDialog();
    };

    return (
        <div><NavigationBar />
        <div className="container p-4">
            <h1 className="text-4xl text-green-900 text-center mb-8">Demandes de gardiennage</h1>
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
                    <Card key={guarding.Id} className="mb-4" style={{ borderRadius: '15px', maxHeight: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }} onClick={() => showGuardingDialog(guarding)}>
                        <div className="flex">
                            <div className="w-2/3 flex flex-col justify-between flex-grow p-2 justify-between bg-customGreen" style={{ borderRadius: '0 15px 15px 0' }}>
                                <h3 className='text-white'>{guarding.Name}</h3>
                                <p className='text-white text-s'>Débute: {guarding.DateStart} Finit: {guarding.DateEnd}</p>
                                <p className='text-white text-s'>Localisation: {guarding.Location}</p>
                                <p className='text-white text-xs'>{guarding.Description.slice(0, 20)}{guarding.Description.length > 20 ? '...' : ''}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <Dialog visible={dialogVisible} onHide={hideGuardingDialog} className="bg-white p-4" style={{ width: '80vw', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                {selectedGuarding && (
                    <div>
                        <h2 className="text-2xl mb-4">{selectedGuarding.Name}</h2>
                        <div>
                            <p><strong>Description:</strong></p>
                            <p>{selectedGuarding.Description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p><strong>Débute:</strong> {selectedGuarding.DateStart}</p>
                                <p><strong>Fini:</strong> {selectedGuarding.DateEnd || "N/A"}</p>
                            </div>
                            <p><strong>Localisation:</strong> {selectedGuarding.Location}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Button onClick={handleRegisterAsGuardian} label="S'inscrire en tant que gardien" className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800" />
                        </div>
                    </div>
                )}
            </Dialog>
            <PlantOptionSwitchButton />
        </div>
        </div>
    );
};

export default PlantGuardingList;
