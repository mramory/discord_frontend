import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
    usersId: Array<string>
}

const initialState: InitialStateType = {
    usersId: [],
}

export const onlineUsersSlice = createSlice({
    name: "onlineUsers",
    initialState: initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.usersId = [...action.payload]
        },
    },
})

export const { setOnlineUsers } = onlineUsersSlice.actions