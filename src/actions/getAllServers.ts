import { ServerApiService } from "@/api/server/serverApi.service";
import { getCurrentUserId } from "./getCurrentUserId";


export const getAllServers = async () => {
    const currentuserId = getCurrentUserId()
    if (currentuserId) {
        return await ServerApiService.getAllServers(+currentuserId)
    }
}