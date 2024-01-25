import { friendsApiService } from "@/api/friends/friendsApi.service"
import { getCurrentUserId } from "./getCurrentUserId";


export const getAllFriends = async () => {
    const currentuserId = getCurrentUserId()
    if (currentuserId) {
        return await friendsApiService.getAllFriends(+currentuserId)
    }
}