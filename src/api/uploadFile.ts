import axios, { AxiosProgressEvent } from "axios";

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