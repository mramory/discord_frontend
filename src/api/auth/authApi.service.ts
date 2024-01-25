import { instance } from "..";
import { LoginArgs } from "./types";
import { UserType } from "@/types/User";


export const AuthApiService = {

    async login(data: LoginArgs) {
        return instance.post("auth/login", {...data})
        .then(res => {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return res.data
        })
    },
    async register(data: UserType) {
        return instance.post("auth/register", {...data})
        .then(res => {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return res.data
        })
    },
    async logout() {
        return instance.get("auth/logout")
        .then(() => {
            instance.defaults.headers.common[
                "Authorization"
            ] = "";
        })
    },
    async refreshToken() {
        return instance.get("auth/refresh")
        .then(res => {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return res.data
        })
        .catch(err => console.error(err.data?.message))
    },
    async checkIsAuth() {
        return instance.get("auth/isAuth")
        .then(res => res.data)
        .catch(err => null)
    },
    async test() {
        return instance.get("auth/test")
        .then(res => res.data)
    }
}