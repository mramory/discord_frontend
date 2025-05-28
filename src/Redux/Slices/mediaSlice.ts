import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
    muted: boolean,
    silent: boolean,
    video: boolean
}

const initialState: InitialStateType = {
    muted: false,
    silent: false,
    video: false,
}

export const mediaSlice = createSlice({
    name: "media",
    initialState: initialState,
    reducers: {
        toggleMuted(state) {
            state.muted = !state.muted
        },
        toggleSilent(state) {
            state.silent = !state.silent
        },
        toggleVideo(state) {
            state.video = !state.video
        },
        setVideo(state, action) {
            state.video = action.payload
        },
    },
})

export const { toggleMuted, toggleSilent, toggleVideo, setVideo } = mediaSlice.actions