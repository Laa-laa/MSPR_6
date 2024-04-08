import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { useNavigate } from 'react-router-dom';

export default function PlantOptionSwitchButton() {
    const options: string[] = ['Demander conseil', 'Faire garder'];
    const [value, setValue] = useState<string>(options[0]);
    const navigate = useNavigate();

    const handleOptionChange = (e: SelectButtonChangeEvent) => {
        setValue(e.value);
        if (e.value === 'Demander conseil') {
            navigate('/add-plant-question');
        } else if (e.value === 'Faire garder') {
            navigate('/faire-garder');
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white rounded-full p-4 shadow-lg fixed bottom-10">
                    <SelectButton value={value} onChange={handleOptionChange} options={options} />
                </div>
            </div>
        </div>
    );
}
