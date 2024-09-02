import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import useAuthStore from "../store/AuthStore";
import '../style/style.css';
import menuBtnStyle from "../style/style";

const MenuBar = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const setIsAuth = useAuthStore((state) => state.setIsAuth);

    return (
        <AppBar sx={{ bgcolor: "#3636e3"}} component="nav">
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
    );
};

export default MenuBar;
