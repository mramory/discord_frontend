import { AuthApiService } from "@/api/auth/authApi.service";
import { LoginArgs } from "@/api/auth/types";
import { IRegisterFormModel } from "@/app/(auth)/register/RegisterForm/RegisterFormModel";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import socket from "@/libs/socket.io";
import { clearUserData, setUserData } from "@/Redux/Slices/authSlice";
import { returnRegisterData } from "@/utils/returnRegisterData";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useLoginService = () => {
  const dispatch = useAppDispatch();

  const login = async (data: LoginArgs) => {
    try {
      const response = await AuthApiService.login(data);

      if (response.accessToken) {
        dispatch(setUserData(response));

        localStorage.setItem("token", response.accessToken);

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

const useRegisterService = () => {
    const dispatch = useAppDispatch()

    const register = async (data: IRegisterFormModel) => {
      try {
        const response = await AuthApiService.register(returnRegisterData(data))

        if(response.accessToken) {
            dispatch(setUserData(response))

            return true
        } else {
            throw new Error
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Ошибка при регистрации")
        } else {
          toast.error("Ошибка при регистрации")
        }
        return false
      }
    }

    return {
        register,
    }
}

const useLogoutService = () => {
    const dispatch = useAppDispatch();

    const logout = async () => {
        try {
            const {userId} = await AuthApiService.logout();

            socket.emit("new_offline_user", userId);

            dispatch(clearUserData());

            localStorage.removeItem("token");

            toast.success("Вы успешно вышли из системы");
        } catch {
            toast.error("Ошибка при выходе из системы");
            
            return false;
        }
    };

    return {
        logout,
    };
};

export { useLoginService, useLogoutService, useRegisterService };

