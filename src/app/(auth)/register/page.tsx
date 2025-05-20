import clsx from "clsx"
import Link from "next/link"
import s from "../style.module.scss"
import { RegisterForm } from "./RegisterForm/RegisterForm"

const Register = () => {
    return(
      <div className={s.wrapper}>
        <div className={s.container}>
          <div className={clsx(s.credentials_register, s.credentials)}>
            <h2>Создать учётную запись</h2>

            <RegisterForm />

            <Link className={s.link} href="/login">Уже зарегистрированы?</Link>
          </div>
        </div>
      </div>
    )
}

export default Register