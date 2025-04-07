"use client"

import Input from "@/components/Input/Input"
import s from "../(auth)/components/style.module.scss"
import Button from "@/components/Button/Button"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthApiService } from "@/api/auth/authApi.service";

export type RestoreArgs = {
    pass: string,
    email: string
}

const Page = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RestoreArgs>();

    const {push} = useRouter()

    const onSubmit = async (data: RestoreArgs) => {
        const response = await AuthApiService.sendEmail(data)
        console.log(response)
        if(response){
            push(`/restore_pass_code?email=${data.email}`)
        }
    }
    return(
        <div className={s.wr}>
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.credentials}>
                    <h2>Восстановление пароля!</h2>
                    <h4>Введите email</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input<RestoreArgs["email"]> register={register} required={true} style={{marginBottom: "20px"}} label="EMAIL" id="email" placeholder="" />
                        <Button type="submit">Получть код</Button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Page