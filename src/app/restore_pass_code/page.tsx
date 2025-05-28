"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { regExpForPass } from "../(auth)/register/RegisterForm/RegisterFormModel";
import s from "../(auth)/style.module.scss";
import { AuthApiService } from "@/api/auth/authApi.service";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

export type RestoreArgs = {
    pass: string,
    email: string
    code: string
}

const Page = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RestoreArgs>();

    const { push } = useRouter()

    const query = useSearchParams()

    const onSubmit = async (data: RestoreArgs) => {
        if(!data.pass.match(regExpForPass)) {
                            window.alert(`пароль должен содержать не менее восьми символов,
                            включая хотя бы одно число и
                            включает как строчные, так и прописные буквы и
                            включать хотя бы один специальный символ: #, ?, !.`)
                            return
                        }
        //@ts-ignore
        const response = await AuthApiService.restorePass({ email: query.get("email"), pass: data.pass, code: data.code })
        console.log(response)
        if(!response) {
            toast.error("Неправильный код")
        }
        if(response) {
            toast.success("Пароль успешно изменен")
            push("/")
        }
    }
    return(
      <div className={s.wr}>
        <div className={s.wrapper}>
          <div className={s.container}>
            <div className={s.credentials}>
              <h2>Введите код который пришел к вам на почту и новый пароль!</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Input<RestoreArgs["email"]> register={register} required={true} style={{ marginBottom: "20px" }} label="КОД" id="code" placeholder="" />

                <Input<RestoreArgs["pass"]> register={register} required={true} style={{ marginBottom: "20px" }} label="НОВЫЙ ПАРОЛЬ" id="pass" placeholder="" />

                <Button type="submit">Сохранить</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Page