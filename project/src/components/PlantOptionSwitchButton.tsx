import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';

export default function PlantOptionSwitchButton() {
    const options: string[] = ['Demander conseil', 'Faire garder'];
    const [value, setValue] = useState<string>(options[0]);

    return (
<div>
    
      <div className="flex justify-center items-center h-screen">
        
       <div className="bg-white rounded-full p-4 shadow-lg fixed bottom-10">
        <SelectButton value={value} onChange={(e: SelectButtonChangeEvent) => setValue(e.value)} options={options} />
      </div>
</div>
</div>

    );
}