"use client";

import { reducer, SettingsContext, Type } from "@/context/SettingsContext";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useLogoutService } from "@/services/AuthService";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useReducer } from "react";
import { RxCross2 } from "react-icons/rx";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings";
import s from "./Settings.module.scss";
import { UserInfoBoard } from "./UserInfoBoard/UserInfoBoard";

export const Settings = () => {
  const settingsContext = useContext(SettingsContext);
  const router = useRouter();
  
  const userName = useTypedSelector((state) => state.auth.name);
  const userViewName = useTypedSelector((state) => state.auth.viewName);
  const userEmail = useTypedSelector((state) => state.auth.email);
  const userImage = useTypedSelector((state) => state.auth.img);

  const userCredentials = useMemo(() => {
    return {
      name: userName,
      viewName: userViewName,
      email: userEmail,
      img: userImage,
    };
  }, [userName, userViewName, userEmail, userImage]);

  const [state, dispatch] = useReducer(reducer, { page: "1" });

  const { logout } = useLogoutService();

  const handleLogout = async () => {
    logout().then(() => {
      router.push("/login");
      settingsContext.close();
    });
  };

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

            <div
              className={clsx(state.page === "3" && s.active)}
              onClick={handleLogout}
            >
              <span>Выйти</span>
            </div>
          </div>
        </div>

        <div className={s.main}>
          <div className={s.close}>
            <button onClick={settingsContext.close}>
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
