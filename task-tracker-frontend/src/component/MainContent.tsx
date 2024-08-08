import React, {useEffect, useState} from 'react';
import '../style/style.css';
import {Container} from "@mui/material";
import Todo from "./Todo";
import Done from "./Done";
import TaskService from "../service/TaskService";
import axios from "axios";
import {TaskResponse} from "../model/response/TaskResponse";

const MainContent = () => {
    console.log("Render Main component");
    const [status, setStatus] = useState<string>('idle');
    const [doneTasks, setDoneTasks] = useState<TaskResponse[]>([]);
    const [todoTasks, setTodoTasks] = useState<TaskResponse[]>([]);

    useEffect(() =>  {
        setStatus("loading");
        TaskService.getTasks()
            .then((response) => {
                if (Array.isArray(response)) {
                    console.log("Tasks response:");
                    console.log(response);
                    setTodoTasks(response.filter(task => !task.isDone));
                    setDoneTasks(response.filter(task => task.isDone));
                }
                setStatus("success");
            })
            .catch((e) => {
                setStatus("error");
                if (e instanceof Error) {
                    console.log(e.message);
                    if (axios.isAxiosError(e)) {
                        console.log(e.response?.data.message);
                    }
                }
            });
    }, []);

    if (status != "success") {
        return (
            <Container sx={{mt:15, mx:60, border: '1px dashed grey', display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center'}}>
            </Container>
        )
    }

    return (
        <Container sx={{mt:15, mx:60, border: '1px dashed grey', display: 'flex', flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center'}}>
            <Todo tasks={todoTasks}></Todo>
            <Done tasks={doneTasks}></Done>
        </Container>
    );
};

export default MainContent;
