import React from 'react';
import '../style/style.css';
import {Box, Container} from "@mui/material";
import {TaskResponse} from "../model/response/TaskResponse";
import Task from "./Task";

type TodoProps = {
    tasks: TaskResponse[];
};

const Todo  = (props: TodoProps) => {
    console.log("Render Todo component. Tasks inside: " + props.tasks.length);
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            m:5,
            // border: '1px solid red',
            borderRadius: 5,
            backgroundColor: '#dcdcdc',
        }}>
            Tasks toodo
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                gap:2,
                // border: '1px dashed blue',
            }}>
                {props.tasks.map(task => (
                    <Task {...task}/>
                ))}
            </Container>
        </Box>
    );
};

export default Todo;
