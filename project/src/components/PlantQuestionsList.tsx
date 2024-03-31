import React from 'react';
import { Card } from 'primereact/card';


export default function PlantQuestionsList() {

    return (
        <div className="container p-4"> 
        <div className="card flex justify-center" style={{ maxHeight: '400px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <Card className="md:w-25rem" style={{ borderRadius: '15px', maxHeight: '100%' }}>
                <div className="flex">
                    <div className="w-1/3 overflow-hidden" style={{ borderRadius: '15px 0 0 15px' }}> {/* Applied overflow-hidden */}
                        <img src={process.env.PUBLIC_URL + '/pexels-scott-webb-1022922.jpg'} alt="plant" className="w-full h-full object-cover" style={{ minWidth: '100%' }} /> {/* Adjust image size */}
                    </div>
                    <div className="w-2/3 flex-grow p-2 justify-between bg-customGreen" style={{ borderRadius: '0 15px 15px 0' }}> {/* Added padding and adjusted border radius */}
                        <h3 className='text-white'>Title</h3>
                        <p className='text-white'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                        </p>
                        <p className='text-white text-xs'>Date: January 1, 2024</p>
                    </div>
                </div>
            </Card>
        </div>
    </div>
    
    )
}