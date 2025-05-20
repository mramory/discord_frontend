import { LoginArgs } from "@/api/auth/types";
import { useAuth } from "@/hooks/useAuth";

export const useLoginAction = () => {
  const { login } = useAuth();
  
  return async (data: LoginArgs) => {
    return await login(data);
  };
}; 