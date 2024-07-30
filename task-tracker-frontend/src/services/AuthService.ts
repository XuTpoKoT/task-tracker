import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    private isAuth = false;
    public static INSTANCE = new AuthService();
    authSubscribers = [];
    private AuthService(){}

    isAuthenticated() :boolean {
        return this.isAuth;
    }

    // setAuthenticated(isAuth) {
    //     this.isAuthenticated = isAuth;
    //     this.notifySubscribers(isAuth);
    // }
    //
    // // Метод подписки на изменения состояния аутентификации
    // subscribeAuthState(callback) {
    //     this.authSubscribers.push(callback);
    //     // Возвращаем функцию для отписки от подписки
    //     return () => {
    //         this.authSubscribers = this.authSubscribers.filter(subscriber => subscriber !== callback);
    //     };
    // }
    // // Пример метода для уведомления подписчиков об изменении состояния
    // notifySubscribers(isAuth) {
    //     this.authSubscribers.forEach(subscriber => subscriber(isAuth));
    // }

    signIn(email: string, password: string) {
        try {
            $api.post<AuthResponse>('/auth/sign-in', {email, password})
                .then(response => {
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    // this.setAuthenticated(true);
                });
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message);
            } else if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            }
        }
    }

    signUp(email: string, password: string, repeatedPassword: string) {
        try {
            $api.post<AuthResponse>('/auth/sign-up', {email, password, repeatedPassword})
                .then(response => {
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    // this.setAuthenticated(true);
                });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            } else if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            }
        }
    }

    signOut() {
        try {
            $api.post<AuthResponse>('/auth/sign-out')
                .then(response => {
                    localStorage.removeItem('token');
                    // this.setAuthenticated(false);
                });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            } else if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            }
        }
    }
}

