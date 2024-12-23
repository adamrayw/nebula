import axios from "axios";

export const fetch = async (url: string): Promise<unknown> => {
    try {
        const response = await axios.get(`http://localhost:8080/api${url}`, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }


}