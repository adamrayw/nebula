import axios from 'axios';

export const deleteFile = async ({ fileId }: { fileId: string }): Promise<void> => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/file/deleteFile/${fileId}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })

        return response.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }

}