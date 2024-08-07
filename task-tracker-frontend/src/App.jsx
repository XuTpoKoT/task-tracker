import React from 'react';
import SignInPage from "./page/SignInPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./page/MainPage";

const App = () => {
    console.log('Token:', localStorage.getItem('token'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/sign-up" element={<SignUpPage/>} />
                <Route path="/sign-in" element={<SignInPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;



