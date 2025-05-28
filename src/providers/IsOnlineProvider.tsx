import { setOnlineUsers } from "@/Redux/Slices/onlineUsersSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import socket from "@/libs/socket.io"
import { useEffect } from "react"

export default function IsOnlineProvider({children}: {children: React.ReactNode}) {

    const currentUserId = useTypedSelector(state => state.auth.id)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(currentUserId){
            socket.emit("new_online_user", currentUserId);
        }

        if(!currentUserId){
            socket.emit("new_offline_user", currentUserId);
        }

        socket.on("connect", () => {
            if(currentUserId){
                socket.emit("new_online_user", currentUserId);
            }
        })

        socket.on("disconnect", () => {
            if(currentUserId){
                socket.emit("new_offline_user", currentUserId);
            }
        })

        socket.on("get_online_users", (usersId) => {
            dispatch(setOnlineUsers(usersId))
        })

        window.addEventListener("beforeunload", function (e) {
            if(currentUserId){
                socket.emit("new_offline_user", currentUserId);
            }
        })

        return () => {
            socket.off("get_online_users")
            socket.off("disconnect")
            socket.off("connect")
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