import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginArgs } from "@/api/auth/types";
import { useLoginService } from "@/services/AuthService";
import { ILoginForm } from "./LoginFormModel";

const useLoginForm = () => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>(); 

    const { login } = useLoginService();

    const onSubmit = async (data: LoginArgs) => {
        login(data).then((res) => {
            if (res) {
                router.push("/channels/me");
            }
        })
    };

    return { onSubmit: handleSubmit(onSubmit), register, errors };
}

export { useLoginForm };
