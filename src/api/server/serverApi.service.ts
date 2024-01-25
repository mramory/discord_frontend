import { instance } from ".."
import {CreateChannelDto} from "./types"


export const ServerApiService = {

    async getAllServers(userId: number) {
        return instance.get(`/server/${userId}`)
        .then(res => res.data)
    },

    async getServer(id: string) {
        return instance.get(`/server/full/${id}`)
        .then(res => res.data)
    },

    async createServer(name: string, img: string = "", userId: number) {
        return instance.post("/server", {name, img, userId})
        .then(res => res.data)
    },

    async serverInvite(code: string, userId: string | number) {
        return instance.patch(`/server/invite/${code}?userId=${userId}`)
        .then(res => res.data)
    },

    async createChannel(dto: CreateChannelDto) {
        return instance.post("/server/channel", dto)
        .then(res => res.data)
    },

    async joinVideo(conversationId: string, mediaStream: MediaStream) {
        return instance.post(`/server/joinVideo/${conversationId}`, {media: mediaStream})
        .then(res => res.data)
    }
}