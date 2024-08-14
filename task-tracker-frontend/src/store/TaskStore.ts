import create from 'zustand';
import {persist} from "zustand/middleware";
import {TaskResponse} from "../model/response/TaskResponse";

interface TaskState {
    tasks: TaskResponse[];
    addTask: (task: TaskResponse) => void;
    removeTask: (taskId: string) => void;
    setTasks: (tasks: TaskResponse[]) => void;
}

const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            tasks: [],
            addTask: (task: TaskResponse) => {
                const tasks =  [...get().tasks, task];
                set({tasks: tasks})
            },
            removeTask: (taskId: string) => {
                const tasks = get().tasks.filter((t) => t.id !== taskId)
                set({tasks: tasks})
            },
            setTasks: (tasks: TaskResponse[]) => set({ tasks: tasks }),
        }),
        {
            name: 'task-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default useTaskStore;