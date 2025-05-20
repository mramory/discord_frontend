"use client";

import Image from "next/image";
import { useCallback, useContext } from "react";
import s from "./CurrentUserBox.module.scss";
import { Avatar } from "@/components/Avatar/Avatar";
import Tag from "@/components/Tag/Tag";
import { SettingsContext } from "@/context/SettingsContext";
import { AlignEnum } from "@/contstants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { toggleMuted, toggleSilent } from "@/Redux/Slices/mediaSlice";


export const CurrentUserBox = () => {
  const dispatch = useAppDispatch()
  const muted = useTypedSelector(state => state.media.muted)
  const silent = useTypedSelector(state => state.media.silent)

  const settingsContext = useContext(SettingsContext)

  const currentUserName = useTypedSelector((state) => state.auth.name);
  const currentUserViewName = useTypedSelector((state) => state.auth.viewName);
  const currentUserImg = useTypedSelector(state => state.auth.img)

  const toggleMicEnable = useCallback(() => {
    dispatch(toggleMuted())
  }, []);

  const toggleHeadPhonesEnable = useCallback(() => {
    dispatch(toggleSilent())
  }, []);

  return (
    <>
      <div className={s.container}>
        <div className={s.user}>
          <div className={s.avatar}>
            <Avatar
              round
              img={currentUserImg}
              height={32}
              width={32}
              contHeight={32}
              contWidth={32}
            />
          </div>

          <div className={s.userName}>
            <p>{currentUserName}</p>

            <div className={s.viewBox}>
              <span>В сети</span>

              <span>{currentUserViewName}</span>
            </div>
          </div>
        </div>

        <div className={s.btns}>
          <Tag align={AlignEnum.TOP} text="Микрофон">
            <div onClick={toggleMicEnable}>
              <Image
                alt="mic"
                width={20}
                height={20}
                src={!muted ? "/micEnabled.svg" : "/micUnEnabled.svg"}
              />
            </div>
          </Tag>

          <Tag align={AlignEnum.TOP} text="Наушники">
            <div>
              <Image
                onClick={toggleHeadPhonesEnable}
                alt="headphones"
                width={20}
                height={20}
                src={
                !silent
                  ? "/headphonesEnabled.svg"
                  : "/headphonesUnEnabled.svg"
              }
              />
            </div>
          </Tag>

          <Tag align={AlignEnum.TOP} text="Настройки пользователя">
            {/* @ts-ignore */}
            <div onClick={settingsContext.toggleIsOpen}>
              <Image alt="settings" width={20} height={20} src="/settings.svg" />
            </div>
          </Tag>
        </div>
      </div>
    </>
  );
};
