import React, {useEffect} from 'react';
import '../style/style.css';
import {Container} from "@mui/material";
import Todo from "./Todo";
import Done from "./Done";
import CreateTask from "./CreateTask";
import useTaskStore from "../store/TaskStore";
import {RequestStatus} from "../service/RequestStatus";
import ErrorAlert from "./ErrorAlert";

const MainContent = () => {
    console.log("Render Main component")
    const status = useTaskStore((state) => state.status)
    const setStatus = useTaskStore((state) => state.setStatus)
    const error = useTaskStore((state) => state.error)
    const tasks = useTaskStore((state) => state.tasks)
    const fetchTasks = useTaskStore((state) => state.fetchTasks)

    useEffect(() =>  {
        fetchTasks();
    }, []);

    if (status === RequestStatus.Error) {
        return (
            <Container sx={{mt:15, mx:50, display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center'}}>
                <ErrorAlert message={error} onClose={() => setStatus(RequestStatus.Loading)}></ErrorAlert>
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
