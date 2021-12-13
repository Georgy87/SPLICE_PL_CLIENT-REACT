import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export { instance };