import { setOnlineUsers } from "@/Redux/Slices/onlineUsersSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import socket from "@/libs/socket.io"
import { useEffect } from "react"
import { io } from "socket.io-client"


export default function IsOnlineProvider({children}: {children: React.ReactNode}) {

    const currentUserId = useTypedSelector(state => state.auth.id)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const clientSocket = io('http://localhost:8000')

        clientSocket.on("connect", () => {
            if(currentUserId){
                socket.emit("new_online_user", currentUserId);
            }
        })

        clientSocket.on("disconnect", () => {
            if(currentUserId){
                socket.emit("new_offline_user", currentUserId);
            }
        })

        clientSocket.on("get_online_users", (usersId) => {
            dispatch(setOnlineUsers(usersId))
        })

        window.addEventListener("beforeunload", function (e) {
            if(currentUserId){
                socket.emit("new_offline_user", currentUserId);
            }
        })

        return () => {
            clientSocket.off("get_online_users")
            clientSocket.off("disconnect")
            clientSocket.off("connect")
            window.removeEventListener("beforeunload", function (e) {
                if(currentUserId){
                    socket.emit("new_offline_user", currentUserId);
                }
            })
        }
    }, [currentUserId])

    return(
        <>{children}</>
    )
}