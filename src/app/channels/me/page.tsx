"use client"

import { getAllFriends } from "@/actions/getAllFriends"
import { AllFriendsPage } from "./all/components/AllFriendsPage/AllFriendsPage"
import { friendsApiService } from "@/api/friends/friendsApi.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useEffect, useState } from "react"
import { UserType } from "@/types/User"


export default function MyPage() {
  const id = useTypedSelector(state => state.auth.id)

  const [friends, setFriends] = useState<UserType[]>([])
  
  // await getAllFriends()
  useEffect(() => {
    if(id){
      friendsApiService.getAllFriends(id!)
      .then(res => setFriends(res))
    }
  }, [id])

    return(
        <AllFriendsPage online={true} initFriends={friends} />
    )
}
