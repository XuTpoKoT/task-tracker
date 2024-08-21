import create from 'zustand';
import {RequestStatus} from "../service/RequestStatus";
import AuthService from "../service/AuthService";

interface AuthState {
    status: RequestStatus;
    error: string;
    isAuth: boolean;
    setStatus: (newStatus: RequestStatus) => void;
    setIsAuth: (isAuth: boolean) => void;
    signIn: (email: string, password: string, navigate: (path: string) => void) => void;
    signUp: (email: string, password: string, repeatedPassword: string, navigate: (path: string) => void) => void;
}

const useAuthStore = create<AuthState>(set => ({
    status: RequestStatus.Loading,
    error: '',
    isAuth: localStorage.getItem("token") != null,
    setStatus: (newStatus: RequestStatus) => {
        set({status: newStatus})
    },
    setIsAuth: (isAuth) => set({ isAuth: isAuth }),
    signIn: async (email: string, password: string, navigate: (path: string) => void) => {
        set({status: RequestStatus.Loading});
        const response = await AuthService.signIn(email, password);
        if (typeof response == 'string') {
            set({status: RequestStatus.Error, error: response});
        } else {
            localStorage.setItem('token', response.token);
            console.log('Token saved:', localStorage.getItem('token'));
            set({status: RequestStatus.Success, isAuth: true})
            navigate('/');
        }
    },
    signUp: async (email: string, password: string, repeatedPassword: string, navigate: (path: string) => void) => {
        set({status: RequestStatus.Loading});
        const response = await AuthService.signUp(email, password, repeatedPassword);
        if (typeof response == 'string') {
            set({status: RequestStatus.Error, error: response});
        } else {
            localStorage.setItem('token', response.token);
            console.log('Token saved:', localStorage.getItem('token'));
            set({status: RequestStatus.Success, isAuth: true})
            navigate('/');
        }
    }
}));

export default useAuthStore;