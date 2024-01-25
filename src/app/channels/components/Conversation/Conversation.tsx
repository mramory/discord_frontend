"use client";

import { Avatar } from "@/components/Avatar/Avatar";
import s from "./Conversation.module.scss";
import { useParams, useRouter } from "next/navigation";
import { ConversationApiService } from "@/api/conversation/conversationApi.service";
import { ContentType, ConversationType, Type } from "@/types/Conversation";
import { useOtherUser } from "@/hooks/useOtherUser";
import { RxCross2 } from "react-icons/rx";
import { MouseEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface ConversationProps {
  data: ConversationType;
  serverId?: string;
}

export const Conversation = ({ data, serverId }: ConversationProps) => {
  const { push } = useRouter();
  const {conversationId: URLconversationId} = useParams()

  const { mutate } = useMutation({
    mutationFn: (id: number) => ConversationApiService.deleteConversation(id),
    onSuccess: () => {
      push("/channels/me");
    },
  });


  const onDeleteConversation = async (id: number, e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault()
    mutate(id);
  };

  if (data.type === "SERVER") {
    return (
      <Link
        href={
          data.contentType === ContentType.VIDEO
            ? `/channels/group/${serverId}/${data.id}/vid`
            : `/channels/group/${serverId}/${data.id}`
        }
      >
        <div className={clsx(s.container, +URLconversationId === data.id && s.active)}>
          <Image width={20} height={20} alt="()" src={data.contentType === ContentType.TEXT ? "/textChannel.svg" : "/voiceChannel.svg"} />
          <span>{data.name}</span>
          <button onClick={(e) => onDeleteConversation(data.id, e)}>
            <RxCross2 />
          </button>
        </div>
      </Link>
    );
  }
  const otherUser = useOtherUser(data);

  return (
    <Link href={`/channels/${data.id}`}>
      <div className={s.container}>
        <Avatar
          round={true}
          width={32}
          height={32}
          contHeight={32}
          contWidth={32}
          img="/pirat.jpg"
        />
        <span>{otherUser?.name}</span>
        <button onClick={(e) => onDeleteConversation(data.id, e)}>
          <RxCross2 />{" "}
        </button>
      </div>
    </Link>
  );
};
