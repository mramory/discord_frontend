"use client";

import { Avatar } from "@/components/Avatar/Avatar";
import { useEffect, useState } from "react";
import s from "./ConstantSidebar.module.scss";
import Tag from "@/components/Tag/Tag";
import { AlignEnum } from "@/contstants";
import CreateGroup from "../../group/components/CreateGroup/CreateGroup";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ServerApiService } from "@/api/server/serverApi.service";
import Link from "next/link";
import { ServerType } from "@/types/Server";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setServers } from "@/Redux/Slices/serverSlice";

export const ConstantSidebar = () => {
  const dispatch = useAppDispatch();

  const userId = useTypedSelector((state) => state.auth.id);

  const servers = useTypedSelector((state) => state.server.servers);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      ServerApiService.getAllServers(userId).then((res) => {
        dispatch(setServers(res));
      });
    }
  }, [userId, dispatch]);

  return (
    <div className={s.container}>
      <Tag text="Личные сообщения" align={AlignEnum.RIGHT}>
        <Link href="/channels/me">
          <Avatar
            changeable={true}
            width={28}
            height={20}
            img="/logoWhite.svg"
          />
        </Link>
      </Tag>

      {servers?.map((server: ServerType) => {
        return (
          <Link
            key={server.id}
            href={`/channels/group/${server.id}/${server.conversations[0].id}`}
          >
            <Tag align={AlignEnum.RIGHT} text={server.name}>
              {server.img ? (
                <Avatar
                  round
                  changeable
                  width={48}
                  height={48}
                  img={server.img}
                />
              ) : (
                <Avatar changeable text={server.name} />
              )}
            </Tag>
          </Link>
        );
      })}
      <Tag align={AlignEnum.RIGHT} text="Добавить сервер">
        <Avatar
          onclick={() => setIsModalOpen(true)}
          changeableGreen={true}
          width={24}
          height={24}
        >
          <svg
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#23A559"
              d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
            ></path>
          </svg>
        </Avatar>
      </Tag>
      <CreateGroup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
