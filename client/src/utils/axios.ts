import axiosInstance from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

const axios = axiosInstance.create({
    baseURL: serverUrl,
    withCredentials: true,
});

export default axios;
