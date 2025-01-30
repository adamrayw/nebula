import { ISignIn } from "@/types/inputSignin";
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_USER_SERVICE_URL,
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

export const auth = async <T>(url: string, data: ISignIn): Promise<T> => {
    try {
        const response = await instance.post(`${url}`, data)

        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("user", JSON.stringify(response.data.data))

        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;

            if (errorData.details) {
                // Error validasi dari Zod
                throw new Error(JSON.stringify(errorData.details));
            }

            if (errorData.message === "User already registered!" || errorData.message === "User not found") {
                // Error di luar zod
                console.log(errorData)
                throw new Error(JSON.stringify([errorData]));
            }

            throw new Error(JSON.stringify([{"message": "Incorrect email or password"}]));
        }

        // Error di luar Axios
        throw new Error('Failed to fetch data');
    }
}