import create from 'zustand';
import {persist} from "zustand/middleware";
import {TaskResponse} from "../model/response/TaskResponse";
import TaskService from "../service/TaskService";
import {RequestStatus} from "../service/RequestStatus";

interface TaskState {
    status: RequestStatus;
    error: string;
    tasks: TaskResponse[];
    setStatus: (newStatus: RequestStatus) => void;
    fetchTasks: () => void;
    addTask: (header: string, description: string| undefined) => void;
    updateTask: (taskId: string, header:string, description: string|undefined, isDone: boolean) => void;
    removeTask: (taskId: string) => void;
}

const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Loading,
            error: '',
            tasks: [],
            setStatus: (newStatus: RequestStatus) => {
                set({status: newStatus})
            },
            fetchTasks: async () => {
                set({status: RequestStatus.Loading});
                const response = await TaskService.getTasks();
                if (typeof response == 'string') {
                    set({status: RequestStatus.Error, error: response});
                } else {
                    set({status: RequestStatus.Success, tasks: response})
                }
            },
            addTask: async (header: string, description: string| undefined) => {
                set({status: RequestStatus.Loading});
                const response = await TaskService.addTask(header, description);
                if (typeof response == 'string') {
                    set({status: RequestStatus.Error, error: response});
                } else {
                    const tasks = [...get().tasks, response];
                    set({status: RequestStatus.Success, tasks: tasks})
                }
            },
            updateTask: async (taskId: string, header:string, description: string|undefined, isDone: boolean) => {
                const response = await TaskService.updateTask(taskId, header, description,
                    isDone);
                if (typeof response == 'string') {
                    set({status: RequestStatus.Error, error: response});
                } else {
                    const newTasks = get().tasks.map((t)=> {
                        if (t.id === response.id) {
                            return response;
                        }
                        return t;
                    })
                    set({status: RequestStatus.Success, tasks: newTasks})
                }

            },
            removeTask: async (taskId: string) => {
                const response = await TaskService.removeTask(taskId);
                if (typeof response == 'string') {
                    set({status: RequestStatus.Error, error: response});
                } else {
                    const tasks = get().tasks.filter((t) => t.id !== taskId)
                    set({status: RequestStatus.Success, tasks: tasks})
                }

            },
        }),
        {
            name: 'task-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default useTaskStore;