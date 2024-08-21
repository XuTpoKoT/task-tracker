import React from 'react';
import useAuthStore from "../store/AuthStore";
import '../style/style.css';
import MenuBar from "../component/MenuBar";
import {Box, CssBaseline} from "@mui/material";
import MainContent from "../component/MainContent";

const MainPage = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CssBaseline />
            <MenuBar/>
            { isAuth ? (
                <MainContent></MainContent>
            ):<></>}
        </Box>
    );
};

export default MainPage;
