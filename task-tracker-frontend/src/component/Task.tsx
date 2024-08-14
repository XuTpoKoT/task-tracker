import React from 'react';
import '../style/style.css';
import {Box, Checkbox, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskResponse} from "../model/response/TaskResponse";
import useTaskStore from "../store/TaskStore";

const Task = (task: TaskResponse) => {
    const removeTask = useTaskStore((state) => state.removeTask);
    console.log(task.header);

    return (
        <Box sx={{
            mx:0,
            display: 'flex',
            flexDirection: 'row',
            // border: '1px dashed purple',
            backgroundColor: '#ffffff',
            borderRadius: 2,
        }}>
            <Checkbox>
            </Checkbox>

            <Typography>
                {task.header}
            </Typography>
            <IconButton onClick={() => {removeTask(task.id)}}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default Task;
