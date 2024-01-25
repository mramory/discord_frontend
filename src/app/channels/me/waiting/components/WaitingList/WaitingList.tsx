'use client'

import s from "./WaitingList.module.scss"
import { useEffect, useState } from "react"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { pusherClient } from "@/libs/pusher"
import { FriendRequestType } from "@/types/Friend"
import WaitingBox from "../WaitingBox/WaitingBox"

interface WaitingListProps {
    initialData: FriendRequestType[]
}

export default function WaitingList({initialData}: WaitingListProps) {

    const currentUserId = useTypedSelector(state => state.auth.id)

    const [waiting, setWaiting] = useState<FriendRequestType[]>(initialData)

    const newRequestHandler = (newRequest: FriendRequestType) => {
        setWaiting(prev => [...prev, newRequest])
    }

    useEffect(() => {
        if(currentUserId){
          pusherClient.subscribe(`friend__${currentUserId}`)
          pusherClient.bind("newFriendRequest", newRequestHandler)
        }

        return () => {
          pusherClient.subscribe(`friend__${currentUserId}`)
          pusherClient.bind("newFriendRequest", newRequestHandler)
        }
    }, [currentUserId])

    return(
        <div>
            {waiting?.map((request: FriendRequestType) => <WaitingBox setWaiting={setWaiting} key={request.senderUserId} id={request.id} user={request.senderUser} />)}
        </div>
    )
}