import { instance } from "..";
import { LoginArgs } from "./types";
import { RestoreArgs } from "@/app/restore_pass/page";
import { UserType } from "@/types/User";


export const AuthApiService = {

    async login(data: LoginArgs) {
        return instance.post("auth/login", { ...data })
        .then(res => {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return res.data
        })
    },
    async register(data: Omit<UserType, "id" | "createdAt" | "img">) {
        return instance.post("auth/register", { ...data })
        .then(res => {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return res.data
        })
        .catch(err => {
            throw err
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
    },
    async restorePass(data: RestoreArgs) {
        return instance.post("auth/restorePass", { ...data })
        .then(res => res.data)
        .catch(err => null)
    },
    async sendEmail(data: RestoreArgs) {
        return instance.post("auth/sendEmail", { ...data })
        .then(res => res.data)
        .catch(err => null)
    },
    async loadUsersJson(filePath: string) {
        return instance.post("auth/loadUsersJson", { filePath })
        .then(res => res.data)
        .catch(err => null)
    },
}