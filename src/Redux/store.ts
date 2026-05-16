import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from "./Api/authApi";
import { conversationApi } from "./Api/conversationApi";
import { authSlice } from "./Slices/authSlice";
import { mediaSlice } from "./Slices/mediaSlice";
import { onlineUsersSlice } from "./Slices/onlineUsersSlice";
import { serverSlice } from "./Slices/serverSlice";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [conversationApi.reducerPath]: conversationApi.reducer,
        [authSlice.name]: authSlice.reducer,
        [serverSlice.name]: serverSlice.reducer,
        [onlineUsersSlice.name]: onlineUsersSlice.reducer,
        [mediaSlice.name]: mediaSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, conversationApi.middleware),
})


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch