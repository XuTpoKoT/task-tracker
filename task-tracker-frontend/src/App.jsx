import React, {FC, useEffect, useState} from 'react';
import AuthService from "./services/AuthService";
import SignInForm from "./components/SignInForm";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    // useEffect(() => {
    //     const authService = AuthService.INSTANCE;
    //     setAuthenticated(authService.isAuthenticated());
    //
    //     // Пример прослушивания изменений аутентификации
    //     const unsubscribe = authService.subscribeAuthState((isAuth) => {
    //         setAuthenticated(isAuth);
    //     });
    //
    //     return () => {
    //         unsubscribe(); // Отписываемся от подписки при размонтировании компонента
    //     };
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/sign-up" element={<SignUpForm/>} />
                <Route path="/sign-in" element={<SignInForm/>} />
                <Route path="/aa" element={<SignIn/>} />
            </Routes>
        </BrowserRouter>
    );

    // return <div>Вы авторизованы</div>
};

export default App;



