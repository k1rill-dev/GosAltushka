import React from 'react';
import {useNavigate} from "react-router-dom";

function Header() {
    let nav = useNavigate()
    return (
        <header className="bg-white flex justify-between items-center py-4 px-6 text-black">
            <div className="flex items-center">
                <a href={"/index"}>
                    <img className="h-10 w-auto mr-4" src="https://via.placeholder.com/30x30" alt="Gosuslugi logo"/>
                    <h1 className="text-xl font-bold">Госальтушка</h1>
                </a>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={() => {
                    nav('/profile')
                }} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md font-medium">Профиль
                </button>
            </div>
        </header>
    );
}

export default Header;
