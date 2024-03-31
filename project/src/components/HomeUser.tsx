import React from "react";
import PlantQuestionsList from "./PlantQuestionsList";
import PlantOptionSwitchButton from "./PlantOptionSwitchButton";

export default function HomeUser(){
 
    return (
        <div>
            <h1 className="text-center p-6">Hello User</h1>
           <PlantQuestionsList /> 
           <PlantOptionSwitchButton />
        </div>
        
    );
}