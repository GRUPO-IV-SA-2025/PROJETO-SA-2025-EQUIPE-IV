import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        if(['post', 'put', 'patch'].includes(config.method) && config.data) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            config.data.user.id = decoded.id;
        }
    }
    return config;
})

api.interceptors.response.use((response) => {
    if (response.status === 403) {
        localStorage.removeItem('token');
    }
    return response;
})

export default api;