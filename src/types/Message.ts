import { ConversationType } from "./Conversation"
import { UserType } from "./User"

export type MessageType = {
    id: number
    text?: string
    image?: string
    createdAt: Date

    senderId: number
    sender: UserType

    conversationId: number
    conversation: ConversationType
}