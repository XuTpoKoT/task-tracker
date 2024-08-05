import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";
import axios from "axios";

export default class AuthService {

    static async signIn(email: string, password: string) {
        try {
            return await $api.post<AuthResponse>('/auth/sign-in', {email, password}).
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

    static async signUp(email: string, password: string, repeatedPassword: string) {
        try {
            return await $api.post<AuthResponse>('/auth/sign-up', {email, password, repeatedPassword})
                .then(response => response.data);
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

