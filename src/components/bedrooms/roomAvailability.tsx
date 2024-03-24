import React from 'react';
import { Button } from '../ui/button';

interface RoomAvailabilityProps {
    open: boolean;
    onClose: () => void;
    isAvailable: boolean;
}

const RoomAvailability: React.FC<RoomAvailabilityProps> = ({ open, onClose, isAvailable }) => {
    if (!open) return null;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full">
                    <div className={`px-4 pt-5 pb-4 sm:p-6 ${isAvailable ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className={`text-lg leading-6 font-medium ${isAvailable ? 'text-green-900' : 'text-red-900'}`}>
                                    {isAvailable ? 'Habitación Disponible' : 'Habitación No Disponible'}
                                </h3>
                                <div className="mt-2">
                                    <p className={`text-sm ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                                        {isAvailable ? '¡Esta habitación está disponible para reservar!' : 'Lo sentimos, esta habitación no está disponible en este momento.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button onClick={onClose} className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${isAvailable ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'} text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { RoomAvailability };
