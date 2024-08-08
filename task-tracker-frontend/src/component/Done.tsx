import React from 'react';
import '../style/style.css';
import {Box, Container} from "@mui/material";
import Task from "./Task";
import {TaskResponse} from "../model/response/TaskResponse";

type DoneProps = {
    tasks: TaskResponse[];
};

const Done = (props: DoneProps) => {
    console.log("Render Done component");
    console.log("Tasks in Done: " + props.tasks.length);
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
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                gap:2,
                border: '1px dashed blue'
            }}>
                {props.tasks.map(task => (
                    <Task {...task}/>
                ))}
            </Container>
        </Box>
    );
};

export default Done;
