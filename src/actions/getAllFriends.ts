import { getCookieByKey } from "./getCookieByKey";
import { friendsApiService } from "@/api/friends/friendsApi.service";


export const getAllFriends = async () => {
    const currentuserId = getCookieByKey("currentUserId")
    if (currentuserId) {
        return await friendsApiService.getAllFriends(+currentuserId)
    }
}