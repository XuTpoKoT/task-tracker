import React from 'react';
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import authStore from "../store/AuthStore";
import '../style/style.css';
import menuBtnStyle from "../style/style";

const MenuBar = () => {
    const isAuth = authStore((state) => state.isAuth);
    const setIsAuth = authStore((state) => state.setIsAuth);

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
                        <Link key={'Home'} to="/" className="link">
                            {'Home'}
                        </Link>
                        { isAuth ? (
                            <Button sx={menuBtnStyle}
                                onClick={() => {
                                    setIsAuth(false);
                                    localStorage.removeItem('token');
                                }}
                            >
                                Sign out
                            </Button>)
                            : (
                                <>
                                    <Link key={'Sign in'} to="/sign-in" className="link">
                                        {'Sign in'}
                                    </Link>
                                    <Link key={'Sign up'} to="/sign-up" className="link">
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
