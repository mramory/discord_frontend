"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthApiService } from "@/api/auth/authApi.service";
import { Loading } from "@/components/Loading/Loading";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUserData } from "@/Redux/Slices/authSlice";
import { IWithChildren } from "@/types/App/UtilTypes";


export default function AuthGuard({ children }: IWithChildren) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AuthApiService.checkIsAuth();
      if (!user) {
        console.log("redirect")
        push("/login");
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
