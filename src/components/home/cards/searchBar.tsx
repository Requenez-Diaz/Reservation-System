import React from 'react';

interface Props {
    mostrar: boolean;
    onClose: () => void;
}

const SearchBar: React.FC<Props> = ({ mostrar, onClose }) => {
    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 ${mostrar ? 'block' : 'hidden'}`}>
            <div className="absolute top-20 p-4 bg-white rounded-lg shadow-lg">
                <input type="text" placeholder="Buscar habitación..." className="w-64 py-2 px-4 border border-gray-300 rounded" />
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default SearchBar;
