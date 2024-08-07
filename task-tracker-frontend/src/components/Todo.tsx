import React from 'react';
import '../style/style.css';
import {Box, Container} from "@mui/material";
import {TaskResponse} from "../models/response/TaskResponse";
import Task from "./Task";

const Todo = (tasks: TaskResponse[]) => {
    console.log("Tasks in Todo: " + tasks.length);
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            m:5,
            border: '1px solid red',
            borderRadius: 5,
            backgroundColor: '#b9b9b9',
        }}>
            Tasks toodo
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                gap:2,
                border: '1px dashed blue',
            }}>
                {tasks.map(task => (
                    <Task {...task}/>
                ))}
            </Container>
        </Box>
    );
};

export default Todo;
