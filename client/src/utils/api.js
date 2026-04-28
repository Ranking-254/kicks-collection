import axios from 'axios';

// This automatically picks the right URL based on where the app is running
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL
});

export default api;