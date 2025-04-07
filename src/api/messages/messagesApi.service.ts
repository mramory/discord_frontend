import { instance } from ".."
import {CreateMessageDto} from "./types"


export const MessagesApiService = {

    async getAllMessages(conversationId: string | number) {
        return instance.get(`messages?convId=${conversationId}`)
        .then(res => res.data)
    },

    async getMessage(id: string | number) {
        return instance.get(`messages/${id}`)
        .then(res => res.data)
    },

    async createMessage(data: CreateMessageDto) {
        return instance.post(`messages/`, {...data})
        .then(res => res.data)
    },

    async deleteMessage(id: number) {
        return instance.delete(`messages/${id}`)
        .then(res => res.data)
    }
}