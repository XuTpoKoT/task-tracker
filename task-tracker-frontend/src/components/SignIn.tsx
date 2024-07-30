import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import { Box, TextField, Button, FormControlLabel, Checkbox, Grid, Link } from '@mui/material';
import {z} from "zod";
import AuthService from "../services/AuthService";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().min(3, 'Пароль должен содержать не менее 3 символов')
        .email('Неверный формат электронной почты'),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
});

type SignInSchemaType = z.infer<typeof schema>;

const SignInForm = () => {
    const authService = AuthService.INSTANCE;
    const { register,
        control,
        handleSubmit,
        formState: { errors } } = useForm<SignInSchemaType>({
        resolver: zodResolver(schema)
    });

    const onSubmit : SubmitHandler<SignInSchemaType> = (data) => {
        authService.signIn(data.email, data.password);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                )}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignInForm;