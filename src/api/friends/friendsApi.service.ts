import { instance } from ".."

export const friendsApiService = {

    async getAllFriends() {
        return instance.get(`friends`)
        .then(res => res.data)
        .catch(err => null) // Implement Normal Error Handler !!!
    },

    async sendRequest(id: number, myId: number) {
        return instance.post(`friends/${id}`, {myId})
        .then(res => res.data)
    },

    async getFriendRequests() {
        return instance.get(`friends/req`)
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