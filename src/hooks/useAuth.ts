import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthApiService } from "@/api/auth/authApi.service";
import { LoginArgs } from "@/api/auth/types";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUserData } from "@/Redux/Slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async (data: LoginArgs) => {
    try {
      const response = await AuthApiService.login(data);

      if (response.accessToken) {
        dispatch(setUserData(response));
        localStorage.setItem("token", response.accessToken);
        router.push("/channels/me");
        return true;
      } else {
        toast.error("Неправильный логин или пароль");
        return false;
      }
    } catch {
      toast.error("Ошибка при входе в систему");
      return false;
    }
  };

  return {
    login,
  };
}; 