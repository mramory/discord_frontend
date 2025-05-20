import { IRegisterFormModel } from "@/app/(auth)/register/RegisterForm/RegisterFormModel"


export const returnRegisterData = (data: IRegisterFormModel) => {
    return {
        email: data.email,
        password: data.password,
        name: data.name,
        viewName: data.viewName ?? `@${data.name}`,
        birthday: {
            day: data.day,
            month: data.month,
            year: data.year,
        },
    }
}