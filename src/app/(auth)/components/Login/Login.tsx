import Input from "@/components/Input/Input"
import s from "../style.module.scss"
import Link from "next/link"
import Button from "@/components/Button/Button"
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import {AuthApiService} from "@/api/auth/authApi.service"
import { LoginArgs } from "@/api/auth/types"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setUserData } from "@/Redux/Slices/authSlice"
import {useRouter} from "next/navigation"
import toast from "react-hot-toast"
import { useTypedSelector } from "@/hooks/useTypedSelector"

interface LoginProps {
    toggleVariant: () => void
}

export const regExpForPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm

const Login: FC<LoginProps> = ({toggleVariant}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginArgs>();

    const role = useTypedSelector((state) => state.auth.role);

    const {push} = useRouter()

    const dispatch = useAppDispatch()

    const onSubmit = async (data: LoginArgs) => {
        const response = await AuthApiService.login(data)
        console.log(response)
        if(response.accessToken){
            dispatch(setUserData(response))
            localStorage.setItem("token", response.accessToken)
            push("/channels/me")
        }
        else{
            toast.error("Неправильный логин или пароль")
        }
    }

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: ChangeEvent) => {
        //@ts-ignore
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
    if (!file) {
      setMessage('Пожалуйста, выберите файл');
      return;
    }
    console.log(file)
    try {
    //@ts-ignore
      const response = await AuthApiService.loadUsersJson(file.name)

      if (response) {
        toast.success('Данные успешно импортированы в базу данных');
      } else {
        toast.error("Пользователи с таким email уже зарегистрированны")
      }
    } catch (error) {
      setMessage('Ошибка при отправке данных');
    }
  };

    return(
        <div className={s.wrapper}>
            <div className={s.container}>
                {role === "ADMIN" ? 
                (<><input type="file" accept=".json" onChange={handleFileChange} />
                <Button onClick={handleUpload} style={{ marginTop: '10px', padding: '10px 20px' }}>
                    Загрузить
                </Button></>) : null}
                <div className={s.credentials}>
                    <h2>С возвращением!</h2>
                    <h4>Мы так рады видеть вас снова!</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input<LoginArgs> register={register} required={true} style={{marginBottom: "20px"}} label="АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ" id="email" placeholder="" />
                        <Input<LoginArgs> register={register} type="password" required={true} label="ПАРОЛЬ" id="password" placeholder="" />
                        <div style={{marginTop: "6px", marginBottom: "22px"}}><Link className={s.link} href={"/restore_pass"}>Забыли пароль?</Link></div>
                        <Button type="submit">Вход</Button>
                    </form>
                    <p>Нужна учетная запись? <Link onClick={toggleVariant} className={s.link} href={"/"}>Зарегистрироваться</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login