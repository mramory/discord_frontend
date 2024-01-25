import { AuthApiService } from "@/api/auth/authApi.service"


const getCurrentUser = async () => {
    return await AuthApiService.checkIsAuth()
}

export default getCurrentUser