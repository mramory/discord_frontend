import toast from "react-hot-toast";
import { AuthApiService } from "@/api/auth/authApi.service";

const useAdminService = () => {
    const uploadUsers = async (file: File) => {
        try {
            const response = await AuthApiService.loadUsersJson(file.name);
      
            if (response) {
              toast.success("Данные успешно импортированы в базу данных");

              return true;
            } else {
              toast.error("Пользователи с таким email уже зарегистрированны");

              return false;
            }
          } catch {
            toast.error("Ошибка при отправке данных");

            return false;
          }
    }

    return { uploadUsers }
}

export { useAdminService };
