"use client";

import { Avatar } from "@/components/Avatar/Avatar";
import s from "@/app/channels/components/Conversation/Conversation.module.scss";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import clsx from "clsx";
import { UserType } from "@/types/User";
import { friendsApiService } from "@/api/friends/friendsApi.service";
import { FriendRequestType } from "@/types/Friend";
import { Dispatch, SetStateAction } from "react";

interface WaitingBoxProps {
  id: number;
  user: UserType;
  setWaiting: Dispatch<SetStateAction<FriendRequestType[]>>
}

export default function WaitingBox({
  user,
  setWaiting,
  id,
}: WaitingBoxProps) {
  const acceptFriendRequest = async () => {
    const res = await friendsApiService.acceptFriendRequest(id);
    setWaiting(prev => prev.filter(req => req.senderUserId !== res.id))
  };
  const denyFriendRequest = async () => {
    const res = await friendsApiService.denyFriendRequest(id);
    setWaiting(prev => prev.filter(req => req.id !== res.id))
  };

  return (
    <div className={clsx(s.container, s.userBox)}>
      <div className={s.user}>
        <Avatar
          round={true}
          width={32}
          height={32}
          contHeight={32}
          contWidth={32}
          img="/pirat.jpg"
        />
        <span>{user.name}</span>
      </div>
      <div>
        <span
          onClick={(e) => acceptFriendRequest()}
          style={{ fontSize: "24px", cursor: "pointer", marginRight: "20px" }}
        >
          <AiFillLike />
        </span>
        <span
          onClick={(e) => denyFriendRequest()}
          style={{ fontSize: "24px", cursor: "pointer" }}
        >
          <AiFillDislike />
        </span>
      </div>
    </div>
  );
}
