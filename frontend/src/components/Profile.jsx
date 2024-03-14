import React, {useState} from 'react';
import Requester from "../Requester";
import axios from "axios";

function getCookie(name) {
    if (!document.cookie) {
        return null;
    }

    const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

async function upload(files) {
    try {
        const {data, status} = await axios.post(
            'http://localhost:8000/api/v1/info/update-photo',
            files,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'X-CSRFToken': getCookie("csrftoken"),
                    Accept: 'application/json',
                },
                withCredentials: true
            },
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

const Profile = () => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const handlePhotoChange = (event) => {
        const files = event.target.files;
        setSelectedPhotos([...selectedPhotos, ...Array.from(files)]); // Convert to array
    };

    let pair = Requester("GET", "http://localhost:8000/api/v1/create-ship", null, true)
    console.log(pair)
    let altushka = Requester("POST", "http://localhost:8000/api/v1/get-alt", JSON.stringify({
        altushka: pair.altushka
    }), true)
    let alt_photo = Requester("POST", "http://localhost:8000/api/v1/info/get-alt-photo", JSON.stringify({
        id: pair.altushka
    }), true)

    let user_photo = Requester("GET", "http://localhost:8000/api/v1/info/update-photo", null, true)
    console.log(alt_photo)
    console.log(user_photo)
    const renderPhotos = () => {
        if (!selectedPhotos.length) return null;
        return (
            <div className="flex flex-wrap gap-2 mb-4">
                {selectedPhotos.map((photo, index) => (
                    <img
                        key={index}
                        className="w-20 h-20 object-cover rounded-lg"
                        src={URL.createObjectURL(photo)}
                        alt={`Uploaded Photo ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    const handleUploadPhotos = async () => {
        await upload(selectedPhotos)
        window.location.reload();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg px-8 pb-8">
                <div className="flex items-center justify-center mb-4">
                    <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={"http://localhost:8000" + user_photo[0].photo}
                        alt="Profile Picture"
                    />
                </div>
                <div className="text-gray-700">
                    <h2 className="text-xl font-bold mb-2">{JSON.parse(localStorage.userInfo).first_name} {JSON.parse(localStorage.userInfo).last_name}</h2>
                    <p className="text-base">Статистика в доте: позиция - {JSON.parse(localStorage.userInfo).dota_pos}|ммр
                        - {JSON.parse(localStorage.userInfo).dota_mmr}</p>
                    <p className="text-base">Email: {JSON.parse(localStorage.userInfo).email}</p>
                </div>
            </div>
            <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Добавить новые фото:
                </label>
                <input
                    type="file"
                    multiple
                    onChange={handlePhotoChange}
                    className="block w-full p-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600"
                />
                {renderPhotos()}
                <button onClick={handleUploadPhotos}
                        className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-700">
                    Добавить фото
                </button>
            </div>

            <br></br>
            {pair.pair === true ? <div>
                <div className="bg-white shadow-md rounded-lg px-4 py-4">
                    <h3 className="text-lg font-bold mb-2">Моя альтушка</h3>
                </div>
                <br></br>
                <div className="bg-white shadow-md rounded-lg px-4 py-4">
                    <img src={"http://localhost:8000" + alt_photo[0].photo} alt={"alt photo"}/>
                    <h3 className="text-lg font-bold mb-2">{altushka.first_name} {altushka.last_name}</h3>
                </div>
            </div> : <div>
                <div className="bg-white shadow-md rounded-lg px-4 py-4">
                    <h3 className="text-lg font-bold mb-2">Альтушки нет</h3>
                </div>
            </div>}
        </div>
    );
};

export default Profile;
