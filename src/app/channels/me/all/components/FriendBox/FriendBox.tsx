"use client";

import clsx from "clsx";
import s from "@/app/channels/components/Conversation/Conversation.module.scss";
import { Avatar } from "@/components/Avatar/Avatar";
import { UserType } from "@/types/User";
import { BiSolidMessage, BiDotsVerticalRounded } from "react-icons/bi";
import { ConversationApiService } from "@/api/conversation/conversationApi.service";
import { useRouter } from "next/navigation";

interface FriendBoxProps {
  user: UserType;
  online: boolean
}

export default function FriendBox({ user, online }: FriendBoxProps) {
  const { push } = useRouter();

  const openOrCreateConversation = async (id: number) => {
    const conversation = await ConversationApiService.createConversation(id);
    push(`/channels/${conversation.id}`);
  };

  return (
    <div onClick={() => openOrCreateConversation(user.id)} className={clsx(s.container, s.friendBox)}>
        <div className={s.line}></div>
      <div className={s.user}>
        <Avatar
          round={true}
          width={32}
          height={32}
          contHeight={32}
          contWidth={32}
          img="/pirat.jpg"
          online={online}
          showOnline
        />
        <span>{user.name}</span>
      </div>
      <div className={s.optionalBtns}>
        <div className={s.roundedDiv} onClick={(e) => {}}>
          <div className={s.popup}>
            <div className={s.triangle}></div>
            <span>Сообщение</span>
          </div>
          <BiSolidMessage />
        </div>
        <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className={s.roundedDiv}>
          <div className={s.popup}>
            <div className={s.triangle}></div>
            <span>Ещё</span>
          </div>
          <BiDotsVerticalRounded />
        </div>
      </div>
    </div>
  );
}
