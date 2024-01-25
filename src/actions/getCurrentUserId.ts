import { cookies } from "next/headers"


export const getCurrentUserId = () => {
    const cookieStore = cookies()
    const currentuserId = cookieStore.get("currentUserId")?.value
    return currentuserId
}