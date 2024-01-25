import Input from "@/components/Input/Input"
import s from "../style.module.scss"
import { FC } from "react"
import Link from "next/link"
import BirthDaySelect from "./BirthDaySelect/BirthDaySelect"
import Button from "@/components/Button/Button"
import { FieldValues, useForm } from "react-hook-form"
import { AuthApiService } from "@/api/auth/authApi.service"
import { UserType } from "@/types/User"
import { setUserData } from "@/Redux/Slices/authSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import {useRouter} from "next/navigation"
import { returnRegisterData } from "@/utils/returnRegisterData"


interface RegisterProps {
    toggleVariant: () => void
}

const Register: FC<RegisterProps> = ({toggleVariant}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>();

    const {push} = useRouter()

    const dispatch = useAppDispatch()

    const onSubmit = async (data: FieldValues) => {
        const response = await AuthApiService.register(returnRegisterData(data) as UserType)
        if(response){
            dispatch(setUserData(response))
            push("/channels/me")
        }
    }

    return(
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.credentials_register + " " + s.credentials}>
                    <h2>Создать учётную запись</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input register={register} label="E-MAIL" required={true} id={"email"} />
                        <Input register={register} label="Отображаемое имя" id={"viewName"} />
                        <Input register={register} label="Имя пользователя" required={true} id={"name"} />
                        <Input register={register} label="Пароль" required={true} id={"password"} />
                        <BirthDaySelect setValue={setValue} register={register} />
                        <Button type="submit">Продолжить</Button>
                    </form>
                    <Link className={s.link} href="/" onClick={toggleVariant}>Уже зарегистрированы?</Link>
                </div>
            </div>
        </div>
    )
}

export default Register