import React from 'react';
import '../style/style.css';
import {Box, Button, Container, TextField} from "@mui/material";
import {z} from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useTaskStore from "../store/TaskStore";

const schema = z.object({
    header: z.string().min(1, "Header is empty"),
    description: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

const CreateTask = () => {
    const addTask = useTaskStore((state) => state.addTask);
    console.log("Render CreateTask component");
    const {
        control,
        handleSubmit,
        formState: { errors } } = useForm<SchemaType>({
        resolver: zodResolver(schema)
    });
    const onSubmit : SubmitHandler<SchemaType> = (data) => {
        console.log("submitting create task " + data.header);
        addTask(data.header, data.description);
    };

    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            m:2,
            borderRadius: 5,
            backgroundColor: '#dcdcdc',
        }}>
            CreateTask
            <Container component="form" onSubmit={handleSubmit(onSubmit)} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap:2,
                // border: '1px dashed blue'
            }}>
                <Controller
                    name="header"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            multiline
                            id="header"
                            label="Header"
                            InputLabelProps={{
                                style: { textAlign: 'center', width: '100%' },
                            }}
                            error={!!errors.header}
                            helperText={errors.header ? errors.header.message : ''}
                            sx={{minHeight:1}}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            multiline
                            id="description"
                            label="Description"
                            required={false}
                            InputLabelProps={{
                                style: { textAlign: 'center', width: '100%' },
                            }}
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                            sx={{minHeight:10}}
                        />
                    )}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create
                </Button>
            </Container>
        </Box>
    );
};

export default CreateTask;
