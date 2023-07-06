import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = '123';
    config.headers.Authorization = `Bearer ${token}`
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // localStorage.removeItem('TOKEN')
        // window.location.reload();
        router.navigate('/login')
        return error;
    }
    throw error;
})

export default axiosClient;