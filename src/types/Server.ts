import { ConversationType } from "./Conversation"


export type ServerType = {
    id: number
    name: string
    img?: string
    inviteCode: string

    conversations: ConversationType[]
}