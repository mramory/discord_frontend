import axios from "axios";
import { HTTP_STATUS } from "@/constants/http";
import { AuthApiService } from "./auth/authApi.service";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

instance.interceptors.response.use(
    async function (response) {
        return response
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await AuthApiService.refreshToken()
            if(!response) {
                console.log("redirect")
            } 

            return instance(originalRequest);
        }

        if (error.response?.status === HTTP_STATUS.NOT_ACCEPTABLE) {
            instance.defaults.headers.common["Authorization"] = ""
        }

        throw error;
    }
)

// instance.interceptors.request.use(
//     function (config) {
//         instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
//         return config;
//     }, function (error) {
//         return Promise.reject(error);
//     })

export { instance };


