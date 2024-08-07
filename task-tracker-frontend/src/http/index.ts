import axios from 'axios';

export const API_URL = `http://localhost:8080/v1`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('token') != null) {
        console.log("Add token " + localStorage.getItem('token'));
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

export default $api;
