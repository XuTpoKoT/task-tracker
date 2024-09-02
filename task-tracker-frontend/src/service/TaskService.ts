import $api, {ErrorResponse} from "../http";
import {AxiosError} from "axios";
import {TaskResponse} from "../model/response/TaskResponse";

export default class TaskService {

    static async getTasks() {
        return await $api.get<TaskResponse[]>('/tasks')
            .then(response => response.data)
            .catch((e) => {
                const err = e as AxiosError;
                const errorResponse = err.response?.data as ErrorResponse;
                const msg = 'Error: ' + (errorResponse.message ?? 'connection failed')
                console.log(msg)
                return msg;
            });
    }

    static async addTask(header: string, description: string|undefined) {
        return await $api.post<TaskResponse>('/tasks', {header, description})
            .then(response => response.data)
            .catch((e) => {
                const err = e as AxiosError;
                const errorResponse = err.response?.data as ErrorResponse;
                const msg = 'Error: ' + (errorResponse.message ?? 'connection failed')
                console.log(msg)
                return msg;
            });
    }

    static async updateTask(taskId: string, header:string, description: string|undefined, isDone: boolean) {
        return await $api.patch<TaskResponse>('/tasks/' + taskId, {header, description, isDone})
            .then(response => response.data)
            .catch((e) => {
                const err = e as AxiosError;
                const errorResponse = err.response?.data as ErrorResponse;
                const msg = 'Error: ' + (errorResponse.message ?? 'connection failed')
                console.log(msg)
                return msg;
            });
    }

    static async removeTask(taskId: string) {
        return await $api.delete('/tasks/' + taskId)
            .catch((e) => {
                const err = e as AxiosError;
                const errorResponse = err.response?.data as ErrorResponse;
                const msg = 'Error: ' + (errorResponse.message ?? 'connection failed')
                console.log(msg)
                return msg;
            });
    }
}

