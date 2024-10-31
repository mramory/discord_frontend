import axios, {AxiosInstance} from "axios";
import {cookies} from "next/headers";
import { AuthApiService } from "./auth/authApi.service";

const serverAxiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
});

serverAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = cookies().get("accessToken")?.value;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      }
)

serverAxiosInstance.interceptors.response.use(
    async function (response) {
        return response
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await AuthApiService.refreshToken()
            if(!response){
                console.log("redirect")
            } 

            return serverAxiosInstance(originalRequest);
        }

        if (error.response?.status === 406) {
            serverAxiosInstance.defaults.headers.common["Authorization"] = ""
        }

        return error;
    }
)

export default serverAxiosInstance;