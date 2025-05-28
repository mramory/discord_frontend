"use client"

import { useCallback } from "react";
import { usePageTransition } from "../Hooks/UsePageTransition";
import s from "../style.module.scss";
import { UploadUsers } from "./Components/UploadUsers/UploadUsers";
import { LoginForm } from "./LoginForm/LoginForm";

const LoginPage = () => {  
    const { goTo, containerRef } = usePageTransition();

    const goToRegister = useCallback(() => {
        goTo("/register");
    }, [goTo]);
        

    return (
      <div 
        ref={containerRef}
        className={s.container} 
      > 
        <UploadUsers />

        <div className={s.credentials}>
          <h2>С возвращением!</h2>

          <h4>Мы так рады видеть вас снова!</h4>

          <LoginForm />

          <p>
            Нужна учетная запись?{" "}

            <button className={s.link} onClick={goToRegister}>
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    )
}

export { LoginPage };
