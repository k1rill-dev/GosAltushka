import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

async function loginUser(dataUser) {
    try {
        const {data, status} = await axios.post (
            'http://localhost:8000/login',
                dataUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
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


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const nav = useNavigate();
    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let userData = {
            email: email,
            password: password
        }
        const userInfo = await loginUser(userData).then(
            r => {
                return JSON.stringify(r, null, 4)
            })
        try {
            if ("Success" in JSON.parse(userInfo))
                localStorage.setItem("userInfo", userInfo);
            nav('/index')
        } catch (e) {

        }
    };

    const altRegistration = (event) => {
        event.preventDefault();

    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://toplogos.ru/images/logo-gosuslugi-ru.png"
                        alt="Госуслуги"
                    />
                    <h2 className="text-2xl font-semibold mt-4">Вход на Госальтушка</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={email}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 focus:ring-opacity-50 text-gray-700 sm:text-sm"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-50"/>
                            <label htmlFor="rememberMe" className="text-sm text-gray-700 ml-3">
                                Запомнить меня
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 font-medium text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            Войти
                        </button>
                    </div>
                </form>
                {errorMessage && (
                    <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
                )}
                <div className="flex items-center justify-between">
                    <a href={"/register/scuf"}
                       className="text-sm text-indigo-600 hover:underline">
                        Регистрация как скуф
                    </a>
                    <a href={"/register/altushka"}
                       className="text-sm text-indigo-600 hover:underline">
                        Регистрация как альтушка
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;