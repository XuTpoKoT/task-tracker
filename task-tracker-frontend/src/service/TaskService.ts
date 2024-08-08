import $api from "../http";
import axios from "axios";
import {TaskResponse} from "../model/response/TaskResponse";

export default class TaskService {

    static async getTasks() {
        try {
            return await $api.get<TaskResponse[]>('/tasks').
                then(response => response.data);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                if (axios.isAxiosError(e)) {
                    console.log(e.response?.data.message);
                }
            }
        }
    }
}

