import { createSlice } from "@reduxjs/toolkit";
import { ERole } from "@/types/App/Enums";

interface InitialState {
    accessToken: string | null,
    name: string,
    email: string,
    role: ERole,
    viewName: string,
    img: string,
    id: number | null,
}

const initialState: InitialState = {
    accessToken: null,
    name: "",
    email: "",
    role: ERole.USER,
    viewName: "",
    img: "",
    id: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUserData: (state, action) => {
            state.email = action.payload.email
            state.name = action.payload.name
            state.role = action.payload.role
            state.viewName = action.payload.viewName
            state.accessToken = action.payload.accessToken
            state.img = action.payload.img
            state.id = action.payload.id
        },  
        clearUserData: (state) => {
            state.accessToken = null
            state.email = ""
            state.name = ""
            state.role = ERole.USER
            state.viewName = ""
            state.img = ""
            state.id = null
        },
    },
})

export const { setUserData, clearUserData } = authSlice.actions