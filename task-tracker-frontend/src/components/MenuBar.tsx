import React from 'react';
import {AppBar, Box, Button, CssBaseline, Link, Toolbar, Typography} from '@mui/material';
import {useAuth} from "../services/SecurityContext";
import AuthService from "../services/AuthService";

const MenuBar = () => {
    const isAuthenticated = useAuth();
    const authService = AuthService.INSTANCE;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ bgcolor: "#3636e3" }} component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Task Tracker
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        <Link key={'Home'} sx={{ color: '#fff' }} borderLeft={5} borderRight={5}
                              borderColor={'#3636e3'} href={'/'}>
                            {'Home'}
                        </Link>
                        { isAuthenticated ? (
                            <Button
                                onClick={() => {
                                    authService.signOut();
                                }}
                            >
                                Sign out
                            </Button>)
                            : (
                                <>
                                <Link key={'Sign in'} sx={{ color: '#fff' }} borderLeft={5} borderRight={5}
                                      borderColor={'#3636e3'} href={'/sign-in'}>
                                    {'Sign in'}
                                </Link>
                                <Link key={'Sign up'} sx={{ color: '#fff' }} borderLeft={5} borderRight={5}
                                      borderColor={'#3636e3'} href={'/sign-up'}>
                                    {'Sign up'}
                                </Link>
                                </>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MenuBar;
