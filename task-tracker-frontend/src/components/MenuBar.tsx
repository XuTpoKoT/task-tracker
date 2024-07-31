import React from 'react';
import {AppBar, Box, CssBaseline, Link, Toolbar, Typography} from '@mui/material';
import {useAuth} from "../services/SecurityContext";

const navItemsForAnonymous = {
    'Home': '/',
    'Sign In': '/sign-in',
    'Sign Up': '/sign-up',
};
const navItemsForAuthenticated = {
    'Home': '/',
    'Sign Out': '/sign-out',
};

const MenuBar = () => {
    const navItems = useAuth() ? navItemsForAuthenticated : navItemsForAnonymous;

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
                        {Object.entries(navItems).map(([text, path]) => (
                            <Link key={text} sx={{ color: '#fff' }} borderLeft={5} borderRight={5}
                                  borderColor={'#3636e3'} href={path}>
                                {text}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MenuBar;
