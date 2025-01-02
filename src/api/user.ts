import { ISignIn } from "@/types/inputSignin";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
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

export const fetchUser = async (url: string): Promise<unknown> => {
    try {
        const response = await instance.get(`${url}`)

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const auth = async (url: string, data: ISignIn): Promise<unknown> => {
    try {
        const response = await instance.post(`${url}`, data)

        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("user", JSON.stringify(response.data.data))

        return response.data
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            throw new Error(error.message)
        }

    }
}