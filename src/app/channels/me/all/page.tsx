'use client'

import { getAllFriends } from "@/actions/getAllFriends"
import { AllFriendsPage } from "./components/AllFriendsPage/AllFriendsPage"
import { UserType } from "@/types/User"
import { useEffect, useState } from "react"
import { friendsApiService } from "@/api/friends/friendsApi.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"


export default async function Page() {

    // const friends = await getAllFriends()
    const currentUserId = useTypedSelector(state => state.auth.id)

    const [friends, setFriends] = useState<UserType[]>([])

    useEffect(() => {
        if(currentUserId)
        friendsApiService.getAllFriends(currentUserId)
        .then(res => setFriends(res))
    }, [currentUserId])

    return(
        <AllFriendsPage initFriends={friends} />
    )
}