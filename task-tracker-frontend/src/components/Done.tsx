import React from 'react';
import '../style/style.css';
import {Box, Container} from "@mui/material";
import Task from "./Task";

const Done = () => {
    console.log("Render Done component");
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            m:2,
            border: '1px solid green',
            borderRadius: 5,
            backgroundColor: '#b9b9b9',
        }}>
            Done tasks
            <Container sx={{m:5, border: '1px dashed blue' }}>
                {/*<Task></Task>*/}
                {/*<Task></Task>*/}
            </Container>
        </Box>
    );
};

export default Done;
