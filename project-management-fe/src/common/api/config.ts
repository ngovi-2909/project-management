import axios from "axios";
import {BASE_URL} from "../../contants/BaseURL";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Accept, Authorization',
        'Access-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, POST',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Pragma: 'no-cache',
        Expires: 0
    },
});

export default api;