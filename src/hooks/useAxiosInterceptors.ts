import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import client from '@/pages/core/lib/axiosInstance';

const useAxiosInterceptors = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = client.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 403) {
                    console.log(error)
                    toast('Invalid token, please re-login');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/signin');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            client.interceptors.response.eject(interceptor);
        };
    }, []);
};

export default useAxiosInterceptors;