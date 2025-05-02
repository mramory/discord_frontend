import { createSlice } from "@reduxjs/toolkit";
import { ERole } from "@/types/App/Enums";
interface InitialState {
    accessToken: string,
    name: string,
    email: string,
    role: ERole,
    viewName: string,
    img: string,
    id: number | null
}

const initialState: InitialState = {
    accessToken: "",
    name: "",
    email: "",
    role: ERole.USER,
    viewName: "",
    img: "",
    id: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUserData(state, action) {
            state.email = action.payload.email
            state.name = action.payload.name
            state.role = action.payload.role
            state.viewName = action.payload.viewName
            state.accessToken = action.payload.accessToken
            state.img = action.payload.img
            state.id = action.payload.id
        }
    }
})

export const { setUserData } = authSlice.actions