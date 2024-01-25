import { instance } from ".."


export const UsersApiService = {

    async getAllUsers() {
        return instance.get("user/getAll")
        .then(res => res.data)
    },

    async changeUser(dto: {newName: string, img: string}) {
        return instance.put("user/change", dto)
        .then(res => res.data)
    }
}