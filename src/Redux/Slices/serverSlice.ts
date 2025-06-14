import { createSlice } from "@reduxjs/toolkit"
import { ServerType } from "@/types/Server"

type InitialStateType = {
    servers: ServerType[]
}

const initialState: InitialStateType = {
    servers: [],
}

export const serverSlice = createSlice({
    name: "server",
    initialState: initialState,
    reducers: {
        setServers(state, action) {
            state.servers = [...action.payload]
        },
        addServer(state, action) {
            state.servers = [...state.servers, action.payload]
        },
    },
})

export const { setServers, addServer } = serverSlice.actions