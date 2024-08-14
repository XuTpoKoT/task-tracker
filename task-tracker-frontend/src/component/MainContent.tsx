import React, {useEffect, useState} from 'react';
import '../style/style.css';
import {Container} from "@mui/material";
import Todo from "./Todo";
import Done from "./Done";
import TaskService from "../service/TaskService";
import axios from "axios";
import CreateTask from "./CreateTask";
import useTaskStore from "../store/TaskStore";

const MainContent = () => {
    console.log("Render Main component");
    const [status, setStatus] = useState<string>('idle');
    const tasks = useTaskStore((state) => state.tasks);
    const setTasks = useTaskStore((state) => state.setTasks);

    useEffect(() =>  {
        setStatus("loading");
        TaskService.getTasks()
            .then((response) => {
                if (response != undefined) {
                    console.log("Tasks response:");
                    console.log(response);
                    setTasks(response);
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
            <Container sx={{mt:15, mx:50, border: '1px dashed grey', display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center'}}>
            </Container>
        )
    }

    return (
        <Container sx={{mt:15, mx:50, border: '1px dashed grey', display: 'flex', flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center'}}>
            <Todo tasks={tasks.filter(task => !task.isDone)}></Todo>
            <Done tasks={tasks.filter(task => task.isDone)}></Done>
            <CreateTask></CreateTask>
        </Container>
    );
};

export default MainContent;
