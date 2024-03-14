import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

function getAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function Registration(props) {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password1: '',
        password2: '',
        who_are_you: 0,
        dateOfBirth: '',
        description: '',
        dota_mmr: 0,
        tanks_rating: 0,
        dota_pos: 0,
        favoriteBeer: '',
    });
    const nav = useNavigate();
    const [error, setError] = useState(null);


    const checkFavoriteBeer = (beer) => {
        return ['жигулевское', 'балтика 9', 'чешское разливное'].includes(beer);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});

        if (name === 'password2') {
            if (value !== formData.password1) {
                setError('Пароли должны совпадать!');
            } else {
                setError(null);
            }
        }
    };
    const updateWhoAreYou = (newWhoAreYou) => {
        return {
            ...formData,
            who_are_you: newWhoAreYou,
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (props.type === "scuf") {
            setFormData(updateWhoAreYou(2))
            if (getAge(formData.dateOfBirth) >= 35 && getAge(formData.dateOfBirth) < 60) {
                if (checkFavoriteBeer(formData.favoriteBeer.toLowerCase())) {
                    console.log('Form scuf Submitted:', formData);
                    // nav("/");
                } else {
                    console.log("ты не пройдешь псевдоскуф")
                }
            } else {
                console.log("возраст должен быть от 35 до 60")
            }
        } else {
            setFormData(updateWhoAreYou(1))
            if (checkFavoriteBeer(formData.favoriteBeer.toLowerCase())) {
                console.log('Form altushka Submitted:', formData);
                nav("/");
            } else {
                console.log("ты не пройдешь псевдоальтушка")
            }
        }
        // Reset form after submission (optional)
        // setFormData({
        //     email: '',
        //     password: '',
        //     confirmPassword: '',
        //     dateOfBirth: '',
        //     dotaRating: '',
        //     tankWorldRating: '',
        //     dotaPosition: '',
        //     favoriteBeer: '',
        // });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Регистрация на Госальтушка</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Имя пользователя
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Имя
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Фамилия
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password1" className="block text-sm font-medium mb-2">
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password1"
                        name="password1"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.password1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password2"
                        className="block text-sm font-medium mb-2"
                    >
                        Подтверждение пароля
                    </label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
                        Дата рождения
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        О себе
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dota_mmr" className="block text-sm font-medium mb-2">
                        Рейтинг в доте
                    </label>
                    <input
                        type="number"
                        id="dota_mmr"
                        name="dota_mmr"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.dota_mmr}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tanks_rating" className="block text-sm font-medium mb-2">
                        Рейтинг в танках
                    </label>
                    <input
                        type="number"
                        id="tanks_rating"
                        name="tanks_rating"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.tanks_rating}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dota_pos" className="block text-sm font-medium mb-2">
                        Позиция в доте
                    </label>
                    <select
                        id="dota_pos"
                        name="dota_pos"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.dota_pos}
                        onChange={handleChange}
                    >
                        <option value="">Позиция в доте</option>
                        <option value="1">Керри</option>
                        <option value="2">Мид</option>
                        <option value="3">Хард</option>
                        <option value="4">Поддержка</option>
                        <option value="5">Полная поддержка</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="favoriteBeer" className="block text-sm font-medium mb-2">
                        Любимое пиво
                    </label>
                    <input
                        type="text"
                        id="favoriteBeer"
                        name="favoriteBeer"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full rounded-md border border-gray-300 py-2 px-3"
                        value={formData.favoriteBeer}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}

export default Registration;