"use client";

import s from "./UserInfoBoard.module.scss";
import useImageColor from "use-image-color";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import { UserType } from "@/types/User";
import { useColor } from "@/hooks/useColor";

interface UserInfoBoardProps {
  user: Omit<UserType, "id" | "password" | "birthday" | "createdAt">;
}

export const UserInfoBoard = ({ user }: UserInfoBoardProps) => {

  const color = useColor(user.img)

  return (
    <div className={s.container}>
      <div className={s.color} style={{ backgroundColor: color }} />
      <div className={s.innerContainer}>
        <div className={s.user}>
          <Avatar
            contWidth={90}
            contHeight={90}
            width={80}
            height={80}
            round
            showOnline
            online
            img={user.img}
          />
          <div className={s.subUser}>
            <p>{user.name}</p>
            <Button
              style={{ whiteSpace: "nowrap", padding: "10px", flex: "0" }}
            >
              Редактировать профиль пользователя
            </Button>
          </div>
        </div>
        <div className={s.credentials}>
          <div>
            <div>
              <p>ОТОБРАЖАЕМОЕ ИМЯ</p>
              <span>{user.name}</span>
            </div>
            <Button style={{backgroundColor: "#4E5058", padding: "10px"}}>Изменить</Button>
          </div>
          <div>
            <div>
              <p>ИМЯ ПОЛЬЗОВАТЕЛЯ</p>
              <span>{user.viewName}</span>
            </div>
            <Button style={{backgroundColor: "#4E5058", padding: "10px"}}>Изменить</Button>
          </div>
          <div>
            <div>
              <p>ЭЛЕКТРОННАЯ ПОЧТА</p>
              <span>{user.email}</span>
            </div>
            <Button style={{backgroundColor: "#4E5058", padding: "10px"}}>Изменить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
