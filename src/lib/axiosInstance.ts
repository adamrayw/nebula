import axios from "axios";

const fileService = axios.create({
    baseURL: import.meta.env.VITE_FILE_SERVICE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

fileService.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
},
    (error) => {
        return Promise.reject(error)
    }
)

export default fileService;