import axios from 'axios';

import { AxiosProgressEvent } from 'axios';

export const uploadFile = async ({ data, onUploadProgress }: { data: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void }): Promise<void> => {

    try {

        const response = await axios.post('http://localhost:8080/api/file/uploadFile', data, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
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