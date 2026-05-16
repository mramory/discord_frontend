import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { HTTP_STATUS } from "@/constants/http";
import { AuthApiService } from "./auth/authApi.service";

const serverAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
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
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await AuthApiService.refreshToken()
            if(!response) {
                console.log("redirect")
            } 

            return serverAxiosInstance(originalRequest);
        }

        if (error.response?.status === HTTP_STATUS.NOT_ACCEPTABLE) {
            serverAxiosInstance.defaults.headers.common["Authorization"] = ""
        }

        return error;
    }
)

export default serverAxiosInstance;