import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    // baseURL: 'https://sample-cloud-server.herokuapp.com/',
    // baseURL: 'https://sample-platform-servergpq.onrender.com'
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

export { instance };