import { SettingsContext, Type, reducer } from "@/context/SettingsContext";
import s from "./Settings.module.scss";
import { useContext, useEffect, useMemo, useReducer } from "react";
import clsx from "clsx";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Avatar } from "@/components/Avatar/Avatar";
import { UserInfoBoard } from "./UserInfoBoard/UserInfoBoard";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings";

export const Settings = () => {
  const settingsContext = useContext(SettingsContext);

  const userName = useTypedSelector((state) => state.auth.name);
  const userViewName = useTypedSelector((state) => state.auth.viewName);
  const userEmail = useTypedSelector((state) => state.auth.email);
  const userImage = useTypedSelector((state) => state.auth.img);

  const userCredentials = useMemo(() => {
    return {
      name: userName,
      viewName: userViewName,
      email: userEmail,
      img: userImage
    };
  }, [userName, userViewName, userEmail, userImage]);

  useEffect(() => {
    document.addEventListener("keydown", settingsContext.toggleIsOpen, false);

    return () => {
      document.removeEventListener(
        "keydown",
        settingsContext.toggleIsOpen,
        false
      );
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, { page: "1" });

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.innerContent, settingsContext.isOpen && s.open)}>
        <div className={s.bar}>
          <div>
            <p>НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ</p>
            <div
              className={clsx(state.page === "1" && s.active)}
              onClick={() => dispatch({ type: Type.CHANGE_PAGE, payload: "1" })}
            >
              <span>Моя учетная запись</span>
            </div>
            <div
              className={clsx(state.page === "2" && s.active)}
              onClick={() => dispatch({ type: Type.CHANGE_PAGE, payload: "2" })}
            >
              <span>Профиль</span>
            </div>
          </div>
        </div>
        <div className={s.main}>
          <div className={s.close}>
            {/* @ts-ignore */}
            <button onClick={settingsContext.toggleIsOpen}>
              <div>
                <RxCross2 />
              </div>
            </button>
            <span>ESC</span>
          </div>
          {state.page === "1" && (
            <>
              <h2>Моя учетная запись</h2>
              <UserInfoBoard user={userCredentials} />
            </>
          )}
          {state.page === "2" && (
            <>
              <h2>Профиль</h2>
              <ProfileSettings img={userImage} name={userName} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
