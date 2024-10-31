import { ServerApiService } from "@/api/server/serverApi.service";
import { getCookieByKey } from "./getCookieByKey";


export const getAllServers = async () => {
    const currentuserId = getCookieByKey("currentUserId")
    if (currentuserId) {
        return await ServerApiService.getAllServers(+currentuserId)
    }
}