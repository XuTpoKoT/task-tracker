import create from 'zustand';

interface AuthState {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

const authStore = create<AuthState>(set => ({
    isAuth: false,
    setIsAuth: (isAuth) => set({ isAuth: isAuth }),
}));

export default authStore;