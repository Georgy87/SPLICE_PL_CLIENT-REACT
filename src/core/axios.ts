import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    // baseURL: 'https://sample-platform.herokuapp.com',
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

export { instance };