import { UsersApiService } from "@/api/users/usersApi.service"


const getAllUsers = async () => {
    const users = await UsersApiService.getAllUsers()
    return users
}

export default getAllUsers