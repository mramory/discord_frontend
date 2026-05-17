"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApiService } from "@/api/server/serverApi.service";
import { Conversation } from "@/app/channels/components/Conversation/Conversation";
import { CurrentUserBox } from "@/app/channels/components/MySidebar/CurrentUserBox/CurrentUserBox";
import Tag from "@/components/Tag/Tag";
import { AlignEnum } from "@/contstants";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { pusherClient } from "@/libs/pusher";
import { ContentType, ConversationType } from "@/types/Conversation";
import { ServerType } from "@/types/Server";
import s from "../../../components/MySidebar/MySidebar.module.scss";
import AddChannel from "../AddChannel/AddChannel";

interface ChannelsSidebarProps {
  serverId: string;
}

export default function ChannelsSidebar({ serverId }: ChannelsSidebarProps) {
  const currentUserId = useTypedSelector((state) => state.auth.id);

  const server = useTypedSelector((state) => state.server.servers).filter(
    (serv) => serv.id === +serverId
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery<ServerType>({
    queryKey: ["server"],
    queryFn: () => ServerApiService.getServer(serverId),
    onSuccess(data) {
      setChannels(data?.conversations);
    },
  });

  const [channels, setChannels] = useState<ConversationType[]>(
    data?.conversations || []
  );

  const newChannelHandler = (newChannel: ConversationType) => {
    setChannels((prev) => [...prev, newChannel]);
  };

  useEffect(() => {
    if (currentUserId) {
      pusherClient.subscribe(`user__${currentUserId}__newChannel`);
      pusherClient.bind("newChannel", newChannelHandler);
    }
    return () => {
      pusherClient.unsubscribe(`user__${currentUserId}__newChannel`);
      pusherClient.unbind("newChannel", newChannelHandler);
    };
  }, []);

  if (!isLoading)
    return (
      <div className={s.wrapper}>
        <div className={s.container}>
          <div className={s.name}>
            <h3>Сервер {server[0]?.name}</h3>
          </div>

          <div className={s.header}>
            <span style={{ fontWeight: "500" }}>ТЕКСТОВЫЕ КАНАЛЫ</span>

            <Tag align={AlignEnum.TOP} text="Создать канал">
              <span
                style={{
                  fontSize: "20px",
                  lineHeight: "16px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                +
              </span>
            </Tag>
          </div>

          {channels?.map((channel: ConversationType) => {
            if (channel.contentType === ContentType.TEXT) {
              return (
                <Conversation
                  serverId={serverId}
                  key={channel.id}
                  data={channel}
                />
              );
            }
          })}

          <div className={s.header}>
            <span style={{ fontWeight: "500" }}>ГОЛОСОВЫЕ КАНАЛЫ</span>

            <Tag align={AlignEnum.TOP} text="Создать канал">
              <span
                style={{
                  fontSize: "20px",
                  lineHeight: "16px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                +
              </span>
            </Tag>
          </div>

          {channels?.map((channel: ConversationType) => {
            if (channel.contentType === ContentType.VIDEO) {
              return (
                <Conversation
                  serverId={serverId}
                  key={channel.id}
                  data={channel}
                />
              );
            }
          })}

          <p>Invite Link:</p>

          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              toast("Copied", { position: "bottom-left" });
              navigator.clipboard.writeText(
                `${window.location.origin}/invite/${data?.inviteCode}`
              );
            }}
          >
            {`${typeof window !== "undefined" ? window.location.origin : ""}/invite/${data?.inviteCode}`}
          </span>
        </div>

        <AddChannel
          serverId={serverId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <CurrentUserBox />
      </div>
    );
}
