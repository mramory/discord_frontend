import { instance } from ".."


export const ConversationApiService = {

    async getAllConversations() {
        return instance.get(`conversation`)
        .then(res => res.data)
        .catch(err => null)
    },

    async getConversation(id: string | number) {
        return instance.get(`conversation/${id}`)
        .then(res => res.data)
        
    },

    async createConversation(userid: string | number) {
        return instance.post(`conversation/${userid}`)
        .then(res => res.data)
        .catch(err => null)
    },
    
    async deleteConversation(id: string | number) {
        return instance.delete(`conversation/${id}`)
        .then(res => res.data)
    }
}