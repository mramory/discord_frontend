import { UserType } from "./User"

export type FriendRequestType = {
    requestId: number,
    senderUserId: number,
    senderUser: UserType,
    recipientUser: UserType,
    recipientUserId: number
    senderName: string
}
