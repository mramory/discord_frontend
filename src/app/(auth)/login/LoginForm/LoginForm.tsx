"use client"

import Link from "next/link";
import s from "../../style.module.scss";
import { ILoginForm } from "./LoginFormModel";
import { useLoginForm } from "./UseLoginForm";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

const LoginForm = () => {
    const { register, onSubmit, errors } = useLoginForm(); 

    return (
      <form onSubmit={onSubmit}>
        <Input<ILoginForm["email"]>
          register={register}
          required={true}
          style={{ marginBottom: "20px" }}
          label="АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ"
          id="email"
          placeholder=""
          error={errors.email?.message}
        />

        <Input<ILoginForm["password"]>
          register={register}
          type="password"
          required={true}
          label="ПАРОЛЬ"
          id="password"
          placeholder=""
          error={errors.password?.message}
        />

        <div style={{ marginTop: "6px", marginBottom: "22px" }}>
          <Link className={s.link} href={"/restore_pass"}>
            Забыли пароль?
          </Link>
        </div>

        <Button type="submit">Вход</Button>
      </form>
    )
}

export { LoginForm };

