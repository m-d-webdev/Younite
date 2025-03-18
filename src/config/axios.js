import axios from 'axios'
import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${Cookies.get("Access_token")}`
    }
});


export default api;