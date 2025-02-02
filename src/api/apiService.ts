import axios from 'axios';

const createApi = (baseURL: string) => {
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
        (error) => Promise.reject(error)
    );
    return instance;
}

// generic function to fetch data
export const apiRequest = async <T>(
    method: 'get' | 'post' | 'delete',
    serviceUrl: string,
    url: string,
    data?: unknown
): Promise<T> => {
    const api = createApi(serviceUrl);
    const response = await api[method](url, data);
    return response.data as T; 
}