import fileService from "@/pages/core/lib/axiosInstance";
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_STARRED_SERVICE_URL,
});

instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const get = async <T>(url: string): Promise<T> => {
    try {
        const response = await fileService.get(`${url}`)

        return response.data as T;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }
}

export const post = async <T>(url: string, data?: unknown): Promise<T> => {
    try {
        const response = await instance.post(`${url}`, data)
        
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }
}

export const remove = async <T>(url: string): Promise<T> => {
    try {
        const response = await instance.delete(`${url}`)

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }
}