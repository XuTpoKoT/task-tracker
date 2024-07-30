import React from 'react';
import AuthService from "../services/AuthService";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";

const schema = z.object({
    email: z.string().min(3, 'Пароль должен содержать не менее 3 символов')
        .email('Неверный формат электронной почты'),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
});

type SignInSchemaType = z.infer<typeof schema>;

const SignInForm = () => {
    const authService = AuthService.INSTANCE;
    const { register,
        handleSubmit,
        formState: { errors } } = useForm<SignInSchemaType>({
        resolver: zodResolver(schema)
    });

    const onSubmit : SubmitHandler<SignInSchemaType> = (data) => {
        authService.signIn(data.email, data.password);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input type="password" {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignInForm;