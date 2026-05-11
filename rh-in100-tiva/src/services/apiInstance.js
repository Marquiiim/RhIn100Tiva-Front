import axios from "axios"
import { toast } from "sonner";

const api = axios.create({
    baseURL: '',
})

api.interceptors.request.use(
    config => {
        console.log('URL completa:', `${config.baseURL}${config.url}`);
        console.log('Método:', config.method?.toUpperCase());
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => {
        const message = response.data?.message

        if (message) toast.success(message)

        return response
    },

    error => {
        const errorData = error.response?.data
        const errorMessage = errorData.message || 'Erro na requisição'

        toast.error(errorMessage)
    }
)

export default api