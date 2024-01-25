"use client";

import { setUserData } from "@/Redux/Slices/authSlice";
import { AuthApiService } from "@/api/auth/authApi.service";
import { Loading } from "@/components/Loading/Loading";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AuthApiService.checkIsAuth();
      if (!user) {
        console.log("redirect")
        push("/");
      } else {
        console.log("success")
        dispatch(setUserData(user));
      }

      setIsLoading(false);
    };

    checkUser();

  }, [dispatch, push]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
