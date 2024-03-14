import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Registration from "./components/Registration";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Profile from "./components/Profile";


function App() {
    let isAuthorized = () => {
        try {
            if (JSON.parse(localStorage.userInfo).Success === "Login successfully")
                return true;
        } catch (e) {
            return false;
        }
        return false;
    }
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path={"/register/scuf"} element={(
                        <div>
                            <Registration type={"scuf"}/>
                        </div>
                    )}>
                    </Route>
                    <Route path={"/register/altushka"} element={(
                        <div>
                            <Registration type={"altushka"}/>
                        </div>
                    )}>
                    </Route>
                    <Route path={"/index"} element={(
                        <div>
                            <Header/>
                            <MainPage auth={isAuthorized()}/>
                        </div>
                    )}>
                    </Route>
                    <Route path={"/profile"} element={(
                        <div>
                            <Header/>
                            <Profile/>
                        </div>
                    )}>
                    </Route>
                    <Route path={"/"} element={(
                        <div>
                            <Login/>
                        </div>
                    )}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
