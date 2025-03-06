/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import toast from 'react-hot-toast';

// Simpan instance API untuk setiap service agar tidak dibuat berulang kali
const apiInstances: Record<string, AxiosInstance> = {};

const createApi = (baseURL: string): AxiosInstance => {
    if (!apiInstances[baseURL]) {
        const instance = axios.create({ baseURL });

        // Request Interceptor
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor
        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log(error)
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.dismiss();

                    toast.error('Invalid token, please re-login');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');

                    setTimeout(() => {
                        window.location.href = "/signin";
                    }, 2500)
                }
                return Promise.reject(error);
            }
        );

        apiInstances[baseURL] = instance; // Simpan instance yang sudah dibuat
    }
    return apiInstances[baseURL];
};

// Generic function to fetch data
export const apiRequest = async <T>(
    method: 'get' | 'post' | 'delete' | 'put' | 'patch',
    serviceUrl: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<T> => {
    try {
        const api = createApi(serviceUrl);
        const response = await api[method](url, data, config);
        return response.data as T;
    } catch (error) {
        console.error(`API Request Error (${method.toUpperCase()} ${url}):`, error);
        throw error;
    }
};
