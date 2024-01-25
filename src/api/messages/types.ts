
export type CreateMessageDto = {
    text?: string
    senderId: number 
    conversationId: string
    image?: string
}