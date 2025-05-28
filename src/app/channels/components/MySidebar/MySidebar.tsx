"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Conversation } from "../Conversation/Conversation";
import { CurrentUserBox } from "./CurrentUserBox/CurrentUserBox";
import s from "./MySidebar.module.scss";
import { ConversationApiService } from "@/api/conversation/conversationApi.service";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { pusherClient } from "@/libs/pusher";
import { ConversationType } from "@/types/Conversation";

export const MySidebar = () => {
  const queryClient = useQueryClient();

  const currentUserId = useTypedSelector((state) => state.auth.id);

  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => ConversationApiService.getAllConversations(),
  });

  const newConversationHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
  };

  const deleteConversationHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
  };

  useEffect(() => {
    if (currentUserId) {
      pusherClient.subscribe(`user__${currentUserId}__newConversation`);
      pusherClient.bind("newConversation", newConversationHandler);
      pusherClient.subscribe(`user__${currentUserId}__deleteConversation`);
      pusherClient.bind("deleteConversation", deleteConversationHandler);
    }

    return () => {
      pusherClient.unsubscribe(`user__${currentUserId}__newConversation`);
      pusherClient.unbind("newConversation", newConversationHandler);
      pusherClient.unsubscribe(`user__${currentUserId}__deleteConversation`);
      pusherClient.unbind("deleteConversation", deleteConversationHandler);
    };
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.header}>
          <span style={{ fontWeight: "500" }}>ЛИЧНЫЕ СООБЩЕНИЯ</span>

          <span
            style={{
              fontSize: "20px",
              lineHeight: "16px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            +
          </span>
        </div>

        {conversations?.map((conversation: ConversationType) => {
          return <Conversation key={conversation.id} data={conversation} />;
        })}
      </div>

      <CurrentUserBox />
    </div>
  );
};
