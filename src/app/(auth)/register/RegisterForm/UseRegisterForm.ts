import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IRegisterFormModel, registerSchema } from "./RegisterFormModel";
import { useRegisterService } from "@/services/AuthService";

const useRegisterForm = () => {
    const router = useRouter();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IRegisterFormModel>({
        resolver: zodResolver(registerSchema),
    }); 

    const { register: regsiterAction } = useRegisterService();

    const onSubmit = async (data: IRegisterFormModel) => {
        regsiterAction(data).then((res) => {
            if (res) {
                router.push("/channels/me");
            }
        })
    };

    return { onSubmit: handleSubmit(onSubmit), register, setValue, errors };
};

export { useRegisterForm };
