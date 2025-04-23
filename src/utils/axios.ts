import axios from "axios";

const axiosInc = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

export default axiosInc;