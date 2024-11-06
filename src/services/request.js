import axios from 'axios'

const VITE_BASE_API = import.meta.env.VITE_BASE_URL;

const service = axios.create({
    baseURL: VITE_BASE_API,
})

/* Настройка запросов */
service.interceptors.request.use(config => {
    const conf = config;

    conf.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    return conf;
}, (error) => {
    Promise.reject(error)
})

/* Настройка ответов */
service.interceptors.response.use((response) => {
    const { data } = response;

    return data;
}, (error) => {
    Promise.reject(new Error(error))
})

export default service;