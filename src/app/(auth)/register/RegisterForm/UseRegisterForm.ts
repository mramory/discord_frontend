import { useRegisterService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IRegisterFormModel, MONTH_TO_NUMBER, registerSchema } from "./RegisterFormModel";

const useRegisterForm = () => {
    const router = useRouter();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IRegisterFormModel>({
        resolver: zodResolver(registerSchema),
    }); 
    console.log(errors);
    const { register: regsiterAction } = useRegisterService();

    const onSubmit = async (data: IRegisterFormModel) => {
        const payload = {
            email: data.email,
            password: data.password,
            name: data.name,
            viewName: data.viewName ?? `@${data.name}`,
            birthday: {
                day: Number(data.day),
                month: MONTH_TO_NUMBER[data.month],
                year: Number(data.year),
            },
        };

        regsiterAction(payload).then((res) => {
            if (res) {
                router.push("/channels/me");
            }
        })
    };

    return { onSubmit: handleSubmit(onSubmit), register, setValue, errors };
};

export { useRegisterForm };
