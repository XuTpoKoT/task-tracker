import React from 'react';
import SignInForm from "./components/SignInForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "./components/MenuBar";

const App = () => {

    return (
        <>
            <MenuBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/sign-up" element={<SignUpForm/>} />
                    <Route path="/sign-in" element={<SignInForm/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;



