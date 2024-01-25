import Input from "@/components/Input/Input"
import s from "../style.module.scss"
import Link from "next/link"
import Button from "@/components/Button/Button"
import { FC } from "react"
import { useForm } from "react-hook-form"
import {AuthApiService} from "@/api/auth/authApi.service"
import { LoginArgs } from "@/api/auth/types"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setUserData } from "@/Redux/Slices/authSlice"
import {useRouter} from "next/navigation"
import { instance } from "@/api"

interface LoginProps {
    toggleVariant: () => void
}

const Login: FC<LoginProps> = ({toggleVariant}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginArgs>();

    const {push} = useRouter()

    const dispatch = useAppDispatch()

    const onSubmit = async (data: LoginArgs) => {
        const response = await AuthApiService.login(data)
        if(response){
            dispatch(setUserData(response))
            localStorage.setItem("token", response.accessToken)
            push("/channels/me")
        }
    }
    return(
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.credentials}>
                    <h2>С возвращением!</h2>
                    <h4>Мы так рады видеть вас снова!</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input<LoginArgs> register={register} required={true} style={{marginBottom: "20px"}} label="АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ" id="email" placeholder="" />
                        <Input<LoginArgs> register={register} type="password" required={true} label="ПАРОЛЬ" id="password" placeholder="" />
                        <div style={{marginTop: "6px", marginBottom: "22px"}}><Link className={s.link} href={"/"}>Забыли пароль?</Link></div>
                        <Button type="submit">Вход</Button>
                    </form>
                    <p>Нужна учетная запись? <Link onClick={toggleVariant} className={s.link} href={"/"}>Зарегистрироваться</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login