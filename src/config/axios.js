import axios from 'axios'
import Cookies from 'js-cookie';

const API_RL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log(API_RL);
    
const api = axios.create({
    baseURL: API_RL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${Cookies.get("Access_token")}`
    }
});


export default api;