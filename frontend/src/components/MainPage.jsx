import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import Requester from "../Requester";
import ConfirmationModal from "./ConfirmationModal";

const girls = [
    {
        first_name: 'Alice',
        age: 25,
        bio: 'Loves travel and adventure!',
        image: 'https://via.placeholder.com/300x400', // Replace with actual image URL
    },
    {
        first_name: 'Beatrice',
        age: 30,
        bio: 'Passionate artist and foodie.',
        image: 'https://via.placeholder.com/300x400', // Replace with actual image URL
    },
    {
        first_name: 'Charlotte',
        age: 28,
        bio: 'Enjoys hiking and reading.',
        image: 'https://via.placeholder.com/300x400', // Replace with actual image URL
    },
];

function MainPage(props) {
    const [currentGirlIndex, setCurrentGirlIndex] = React.useState(0);
    // const [altPhoto, setAltPhoto] = useState([]);

    const nav = useNavigate();
    let recommendList = Requester("GET", "http://localhost:8000/api/v1/get-recommendation", null, true)
    let pair = Requester("GET", "http://localhost:8000/api/v1/create-ship", null, true)
    const handleSwipeLeft = () => {
        setCurrentGirlIndex(prevIndex => prevIndex === 0 ? girls.length - 1 : prevIndex - 1);
    };

    const handleSwipeRight = () => {
        setCurrentGirlIndex(prevIndex => (prevIndex + 1) % girls.length);

    };

    const currentGirl = recommendList[currentGirlIndex];
    // console.log(currentGirl.id)
    let altPhoto = Requester("POST", "http://localhost:8000/api/v1/info/get-alt-photo", JSON.stringify({
        id: currentGirl.id
    }), true)
    console.log(altPhoto)

    const handleLike = (address) => {
        let data = {
            scuf: parseInt(JSON.parse(localStorage.userInfo).id),
            altushka: currentGirl.id,
            address: address
        }
        Requester("POST", "http://localhost:8000/api/v1/create-ship", JSON.stringify(data), true);
    }
    if (props.auth === true && pair.pair === false) {
        return (
            <div className="flex h-screen bg-gray-100">
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <button onClick={handleSwipeLeft}
                            className="bg-red-500 text-white p-4 rounded shadow hover:bg-red-700">
                        Предыдущая
                    </button>
                </div>
                <div className="w-full max-w-md mx-auto">
                    <img
                        src={"http://localhost:8000" + altPhoto[0].photo}
                        alt={currentGirl.username}
                        className="rounded-lg shadow-lg object-cover h-96 w-full"
                    />
                    <div className="p-4 mt-4 bg-white rounded shadow">
                        <h2 className="text-2xl font-bold">{currentGirl.first_name} {currentGirl.last_name}</h2>
                        <p>Статистика в доте: позиция - {currentGirl.dota_pos}|ммр - {currentGirl.dota_mmr}</p>
                        <p>Рейтинг в танках: {currentGirl.tanks_rating}</p>
                        <br></br>
                        <ConfirmationModal
                            message="Вы уверены?"
                            onConfirm={handleLike}
                            onCancel={() => console.log('Deletion cancelled')}
                        />
                    </div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <button onClick={handleSwipeRight}
                            className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-700">
                        Следующая
                    </button>
                </div>
            </div>

        );
    } else if (props.auth === true && pair.pair === true) {
        return (
            <div>
                <h1>У вас уже есть альтушка</h1>
            </div>
        )
    } else {
        return (
            <Navigate to={"/"}/>
        );
    }
}

export default MainPage;