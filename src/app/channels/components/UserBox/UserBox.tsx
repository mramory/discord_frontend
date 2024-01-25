'use client'

import {useMemo} from "react"
import { Avatar } from "@/components/Avatar/Avatar";
import s from "../Conversation/Conversation.module.scss";
import { UserType } from "@/types/User";
import clsx from "clsx";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { friendsApiService } from "@/api/friends/friendsApi.service";
import toast from "react-hot-toast";

interface UserBoxProps {
  user: UserType;
}

export default function UserBox({ user }: UserBoxProps) {

  const onlineUsersId = useTypedSelector(state => state.onlineUsers.usersId)

  const currentUserId = useTypedSelector(state => state.auth.id)

  const sendFriendRequest = async (e: React.MouseEvent<HTMLSpanElement>, id: number) => {
    e.stopPropagation()
    if(currentUserId){
      friendsApiService.sendRequest(id, currentUserId)
      .then(() => toast.success("Friend Request Send!"))
      .catch(err => {
        if(err.response.status === 403) toast.error("Already Friends")
        else toast.error("Friend Request Already Send")
    })
    }
  }

  const isOnline = useMemo(() => {
    return onlineUsersId.includes(user.id.toString())
  }, [onlineUsersId])

  return (
    <div
      className={clsx(s.container, s.userBox)}
    >
      <div className={s.user}>
        <Avatar
          round={true}
          width={32}
          height={32}
          contHeight={32}
          contWidth={32}
          img="/pirat.jpg"
          online
        />
        <span>{user.name}</span>
        {isOnline && <span>В сети</span>}
      </div>
      <span onClick={(e) => sendFriendRequest(e, user.id)} style={{ fontSize: "28px", cursor: "pointer" }}>+</span>
    </div>
  );
}
