import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {z} from "zod";
import AuthService from "../services/AuthService";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

const schema = z.object({
    email: z.string().email('Неверный формат электронной почты'),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
    repeatedPassword: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
});

type SignUpSchemaType = z.infer<typeof schema>;

const SignUpForm = () => {
    const authService = AuthService.INSTANCE;
    const navigate = useNavigate();
    const { register,
        control,
        handleSubmit,
        formState: { errors } } = useForm<SignUpSchemaType>({
        resolver: zodResolver(schema)
    });

    const onSubmit : SubmitHandler<SignUpSchemaType> = (data) => {
        authService.signUp(data.email, data.password, data.repeatedPassword)
        navigate('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
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
                                label="Password"
                                type="password"
                                id="password"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                        )}
                    />
                    <Controller
                        name="repeatedPassword"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                label="repeatedPassword"
                                type="password"
                                id="repeatedPassword"
                                error={!!errors.repeatedPassword}
                                helperText={errors.repeatedPassword ? errors.repeatedPassword.message : ''}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpForm;


