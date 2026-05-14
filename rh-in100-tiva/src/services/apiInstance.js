import axios from "axios"
import { toast } from "sonner";

const api = axios.create({
    baseURL: 'https://rhin100tiva-back.onrender.com',
    timeout: 10000
})

api.interceptors.request.use(
    config => {
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => {
        if (response.data?.message) toast.success(response.data.message)

        return response
    },

    error => {
        if (error.response) {
            toast.error(error.response?.data.message)
        } else if (error.request) {
            toast.error('Não foi possível conectar ao servidor')
        } else {
            toast.error(error.message)
        }
        return Promise.reject(error)
    }
)

export default api