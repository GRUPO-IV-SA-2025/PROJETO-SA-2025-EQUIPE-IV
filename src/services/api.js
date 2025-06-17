import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000/teste",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(() => {

})


export default api;