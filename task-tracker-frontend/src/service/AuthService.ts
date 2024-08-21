import $api, {ErrorResponse} from "../http";
import {AuthResponse} from "../model/response/AuthResponse";
import {AxiosError} from "axios";

export default class AuthService {

    static async signIn(email: string, password: string) {
        return await $api.post<AuthResponse>('/auth/sign-in', {email, password})
            .then(response => response.data)
            .catch((e) => {
                const err = e as AxiosError;
                const errorResponse = err.response?.data as ErrorResponse;
                const msg = 'Error: ' + (errorResponse.message ?? 'connection failed')
                console.log(msg)
                return msg;
            });
    }

    static async signUp(email: string, password: string, repeatedPassword: string) {
        return await $api.post<AuthResponse>('/auth/sign-up', {email, password, repeatedPassword})
            .then(response => response.data)
            .catch((e) => {
                const err = e as AxiosError;
                const errorResponse = err.response?.data as ErrorResponse;
                const msg = 'Error: ' + (errorResponse.message ?? 'connection failed')
                console.log(msg)
                return msg;
            });
    }
}

