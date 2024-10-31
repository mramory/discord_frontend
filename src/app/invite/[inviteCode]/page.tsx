'use client'

import { addServer } from "@/Redux/Slices/serverSlice"
import { ServerApiService } from "@/api/server/serverApi.service"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"


export default function InvitePage({params}: {params: {inviteCode: string}}) {
    const currentUserId = useTypedSelector(state => state.auth.id)

    const dispatch = useAppDispatch()

    const {push} = useRouter()

    useEffect(() => {
        if(currentUserId) {
            ServerApiService.serverInvite(params.inviteCode, currentUserId)
            .then((res) => {
                dispatch(addServer(res))
                toast.success("Added To Server")
            })
            .catch(() => toast.error("Invalid Invite Code"))
            .finally(() => push("/channels/me"))
        }
    }, [])

    return(
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#2B2D31"}}></div>
    )
}