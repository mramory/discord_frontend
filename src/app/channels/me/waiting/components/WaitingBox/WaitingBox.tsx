"use client";

import { friendsApiService } from "@/api/friends/friendsApi.service";
import s from "@/app/channels/components/Conversation/Conversation.module.scss";
import { Avatar } from "@/components/Avatar/Avatar";
import { FriendRequestType } from "@/types/Friend";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

interface WaitingBoxProps {
  id: number;
  userName: string;
  setWaiting: Dispatch<SetStateAction<FriendRequestType[]>>
}

export default function WaitingBox({
  userName,
  setWaiting,
  id,
}: WaitingBoxProps) {
  console.log(userName)
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
        <span>{userName}</span>
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
