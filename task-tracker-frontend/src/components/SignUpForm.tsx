// @ts-ignore
import React, {FC, useState} from 'react';
import AuthService from "../services/AuthService";
const SignUpForm = () => {
    const authService = AuthService.INSTANCE;
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatedPassword, setRepeatedPassword] = useState<string>('')

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <input
                onChange={e => setRepeatedPassword(e.target.value)}
                value={repeatedPassword}
                type="password"
                placeholder='Повторите пароль'
            />
            <button onClick={() => authService.signUp(email, password, repeatedPassword)}>
                Регистрация
            </button>
        </div>
    );
};

export default SignUpForm;

