import React, {FC} from 'react';
import {Alert} from "@mui/material";

interface ErrorAlertProps {
    message: string;
    onClose: () => void;
}

const ErrorAlert : FC<ErrorAlertProps> = ({message, onClose}) => {
    return (
        <Alert severity="error" onClose={onClose}>
            {message}
        </Alert>
    );
};

export default ErrorAlert;