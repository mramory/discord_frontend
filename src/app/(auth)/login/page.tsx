import Link from "next/link";
import s from "../style.module.scss";
import { UploadUsers } from "./Components/UploadUsers/UploadUsers";
import { LoginForm } from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}> 
        <UploadUsers />

        <div className={s.credentials}>
          <h2>С возвращением!</h2>

          <h4>Мы так рады видеть вас снова!</h4>

          <LoginForm />

          <p>
            Нужна учетная запись?{" "}

            <Link className={s.link} href="/register">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
