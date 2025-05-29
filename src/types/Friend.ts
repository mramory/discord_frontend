import { UserType } from "./User"

export type FriendRequestType = {
    id: number,
    senderUserId: number,
    senderUser: UserType,
    recipientUser: UserType,
    recipientUserId: number
    senderName: string
}
