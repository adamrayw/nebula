import client from "@/pages/core/lib/axiosInstance";
import axios, { AxiosProgressEvent } from "axios";

export const get = async <T>(url: string): Promise<T> => {
    try {
        const response = await client.get(`${url}`)

        return response.data as T;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }
}

export const post = async <T>(url: string, data: unknown): Promise<T> => {
    try {
        const response = await client.post(`${url}`, data)

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }
}

export const deleteFile = async <T>(url: string, fileId: string): Promise<T> => {
    try {
        const response = await client.delete(`${url}${fileId}`)

        return response.data;
    } catch (error) {
        console.log("Failed to delete starred-service : ")
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }
}

export const uploadFile = async <T>(url: string, { data, onUploadProgress }: { data: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void }): Promise<T> => {

    try {
        const token = sessionStorage.getItem('token')
        const clientUrl = import.meta.env.VITE_FILE_SERVICE_URL
        const response = await axios.post(`${clientUrl}${url}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            onUploadProgress,
        })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('Failed to fetch data')
    }

}