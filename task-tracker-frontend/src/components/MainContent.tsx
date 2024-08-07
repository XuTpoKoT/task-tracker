import React, {useEffect, useRef, useState} from 'react';
import '../style/style.css';
import {Container} from "@mui/material";
import Todo from "./Todo";
import Done from "./Done";
import TaskService from "../services/TaskService";
import axios from "axios";
import {TaskResponse} from "../models/response/TaskResponse";

const MainContent = () => {
    console.log("Render Main component");
    const [status, setStatus] = useState<string>('idle');
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const tasksRef = useRef<TaskResponse[]>(tasks);

    useEffect(() =>  {
        setStatus("loading");
        TaskService.getTasks()
            .then((response) => {
                if (Array.isArray(response)) {
                    console.log("Setting tasks:");
                    console.log(response);
                    setTasks(response);
                    console.log(tasks);
                    tasksRef.current = response;
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

    useEffect(() => {
        console.log("Tasks updated:");
        console.log(tasks);
        tasksRef.current = tasks;
    }, [tasks]);

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
            <Todo {...tasks}></Todo>
            <Done></Done>
        </Container>
    );
};

export default MainContent;
