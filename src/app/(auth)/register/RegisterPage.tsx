"use client"

import clsx from "clsx";
import { useCallback } from "react";
import { usePageTransition } from "../Hooks/UsePageTransition";
import s from "../style.module.scss";
import { RegisterForm } from "./RegisterForm/RegisterForm";

const RegisterPage = () => {
  const { goTo, containerRef } = usePageTransition();

  const goToLogin = useCallback(() => {
      goTo("/login");
  }, [goTo]);

  return (
    <div 
      ref={containerRef}
      className={s.container} 
    >
      <div className={clsx(s.credentials_register, s.credentials)}>
        <h2>Создать учётную запись</h2>

        <RegisterForm />

        <button className={s.link} onClick={goToLogin}>Уже зарегистрированы?</button>
      </div>
    </div>
  );
};

export { RegisterPage };
