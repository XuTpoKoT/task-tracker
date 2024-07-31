import axios from 'axios';

export const API_URL = `http://localhost:8080/v1`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

// $api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

// $api.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
//             localStorage.setItem('token', response.data.accessToken);
//             return $api.request(originalRequest);
//         } catch (e) {
//
//         }
//     }
//     throw error;
// })

export default $api;
