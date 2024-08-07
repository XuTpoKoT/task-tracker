import React from 'react';
import '../style/style.css';
import {Box, Checkbox, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskResponse} from "../models/response/TaskResponse";

const Task = (task: TaskResponse) => {

    return (
        <Box sx={{
            mx:0,
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'right',
            // alignItems: 'right',
            border: '1px dashed purple',
            backgroundColor: '#ffffff',
            borderRadius: 2,
        }}>
            <Checkbox>
            </Checkbox>

            <Typography>
                Реализация получения сообщений от Kafka
            </Typography>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default Task;
