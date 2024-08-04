import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";
import SecurityContext from "./SecurityContext";

export default class AuthService {
    public static INSTANCE = new AuthService();
    private AuthService(){}

    signIn(email: string, password: string) {
        try {
            $api.post<AuthResponse>('/auth/sign-in', {email, password})
                .then(response => {
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    console.log('Token saved:', localStorage.getItem('token'));
                    SecurityContext.INSTANCE.setAuthenticated(true);
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
                    SecurityContext.INSTANCE.setAuthenticated(true);
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
        localStorage.removeItem('token');
        SecurityContext.INSTANCE.setAuthenticated(false);
    }
}

