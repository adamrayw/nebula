import fileService from "@/lib/axiosInstance";
import axios, { AxiosProgressEvent } from "axios";

export const get = async (url: string): Promise<unknown> => {
    try {
        const response = await fileService.get(`${url}`)

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const post = async (url: string, data: unknown): Promise<unknown> => {
    try {
        const response = await fileService.post(`${url}`, data)

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const deleteFile = async (url: string, fileId: string): Promise<unknown> => {
    try {
        const response = await fileService.delete(`${url}${fileId}`)

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const uploadFile = async (url: string, { data, onUploadProgress }: { data: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void }): Promise<void> => {

    try {
        const token = sessionStorage.getItem('token')
        const fileServiceUrl = import.meta.env.VITE_FILE_SERVICE_URL
        const response = await axios.post(`${fileServiceUrl}${url}`, data, {
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
    }

}