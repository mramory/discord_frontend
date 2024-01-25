import { friendsApiService } from "@/api/friends/friendsApi.service"
import { getCurrentUserId } from "./getCurrentUserId";


export const getFriendRequests = async () => {
    const currentuserId = getCurrentUserId()
    if (currentuserId) {
        return await friendsApiService.getFriendRequests(+currentuserId)
    }
}