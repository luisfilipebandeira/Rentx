import axios from 'axios'

const api = axios.create({
    baseURL: 'http://10.1.0.5:3333'
})

export default api