import { friendsApiService } from "@/api/friends/friendsApi.service"
import { getCookieByKey } from "./getCookieByKey";


export const getAllFriends = async () => {
    const currentuserId = getCookieByKey("currentUserId")
    if (currentuserId) {
        return await friendsApiService.getAllFriends(+currentuserId)
    }
}