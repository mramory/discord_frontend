"use client";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import s from "./UserInfoSidebar.module.scss";
import { Avatar } from "@/components/Avatar/Avatar";
import { useOtherUser } from "@/hooks/useOtherUser";
import { ConversationType } from "@/types/Conversation";

interface UserInfoSidebarProps {
  conversation: ConversationType;
}

export function UserInfoSidebar({ conversation }: UserInfoSidebarProps) {
  // const [otherUser, setOtherUser] = useState<UserType | null>(null)
  const otherUser = useOtherUser(conversation)
  // useEffect(() => {
  //   const user = useOtherUser(conversation)
  //   setOtherUser(user)
  // }, [conversation])

  const [isOwnServersOpen, setIsOwnServersOpen] = useState(false)

  const openServers = () => {
    setIsOwnServersOpen(prev => !prev)
  }

  if(otherUser)
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Avatar
          contHeight={90}
          contWidth={90}
          width={90}
          height={90}
          round={true}
          img="/pirat.jpg"
        />

        <div className={s.infoBox}>
          <div className={s.head}>
            <p>{otherUser.viewName}</p>

            <p>{otherUser.email}</p>
          </div>

          <div className={s.main}>
            <div className={s.aboutMe}>
              <p>ОБО МНЕ</p>

              <p>Krutak</p>
            </div>

            <div className={s.since}>
              <p>В ЧИСЛЕ УЧАСТНИКОВ DISCORD С</p>

              <p>{format(new Date(otherUser.createdAt), "PP")}</p>
            </div>
          </div>

          <div className={s.bottom}>
            <p>ЗАМЕТКА</p>

            <input placeholder="Нажмите, чтобы добавить заметку"></input>
          </div>
        </div>

        <div onClick={openServers} className={clsx(s.infoBox, s.servers)}>
          <p>2 общих сервера</p>

          <div className={isOwnServersOpen ? s.open : s.close} style={{ marginLeft: "auto" }}><MdArrowForwardIos /></div>
        </div>
      </div>
    </div>
  );
}
