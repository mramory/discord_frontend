import { instance } from ".."

export const friendsApiService = {

    async getAllFriends(currentUserId: number) {
        return instance.get(`friends?currentUserId=${currentUserId}`)
        .then(res => res.data)
        .catch(err => null) // Implement Normal Error Handler !!!
    },

    async sendRequest(id: number, myId: number) {
        return instance.post(`friends/${id}`, {myId})
        .then(res => res.data)
    },

    async getFriendRequests(currentUserId: number) {
        return instance.get(`friends/req?currentUserId=${currentUserId}`)
        .then(res => res.data)
        .catch(err => null)
    },
    
    async acceptFriendRequest(requestId: number) {
        return instance.post(`friends?requestId=${requestId}`)
        .then(res => res.data)
    },

    async denyFriendRequest(requestId: number) {
        return instance.delete(`friends?requestId=${requestId}`)
        .then(res => res.data)
    },

}