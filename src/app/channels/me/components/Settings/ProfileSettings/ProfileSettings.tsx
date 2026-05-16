"use client";

import clsx from "clsx";
import { FC, useEffect, useMemo, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UsersApiService } from "@/api/users/usersApi.service";
import { Avatar } from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUserData } from "@/Redux/Slices/authSlice";
import { fileToBlob } from "@/utils/fileToBlob";
import { shallowCompare } from "@/utils/objCompare";
import s from "./ProfileSettings.module.scss";

const MAX_AVATAR_FILE_BYTES = 73000;

type ProfileSettingsType = {
  name: string;
  img: string
};

export const ProfileSettings: FC<ProfileSettingsType> = ({ name, img }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      newName: name,
      img: img || "/pirat.jpg",
    },
  });

  const submitToastRef = useRef<string | null>("");

  const watchAll = watch();

  const resetHandle = () => {
    if (submitToastRef.current) {
      toast.dismiss(submitToastRef.current);
    }
    reset(initData);
  };

  const initData = useMemo(() => {
    return {
      newName: name,
      img: img || "/pirat.jpg",
    };
  }, [name, img]);

  useEffect(() => {
    if (!shallowCompare(watchAll, initData)) {
      if (submitToastRef.current) {
        return;
      }
      submitToastRef.current = toast.custom(
        (t) => (
          <div className={clsx(s.toast, t.visible ? s.enter : s.leave)}>
            <p>Аккуратнее, вы не сохранили изменения!</p>

            <div>
              <Button onClick={resetHandle}>Сброс</Button>

              <Button form="profileForm" type="submit">
                Сохранить изменения
              </Button>
            </div>
          </div>
        ),
        {
          position: "bottom-center",
          duration: Infinity,
        }
      );
    } else {
      if (submitToastRef.current) {
        toast.dismiss(submitToastRef.current);
      }
      submitToastRef.current = null;
    }
  }, [watchAll]);

  const toBase64 = (file: File) => {
    if(typeof file == "string") {
      return file
    }
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (data: FieldValues) => {
    const  base64 = await toBase64(data.img)
    const response = await UsersApiService.changeUser(
      { ...data, img: base64 } as { newName: string, img: string }
    );

    if(response?.img) {
      setValue("img", response.img);
    }
    dispatch(setUserData(response));
    toast.dismiss(submitToastRef.current!);
    submitToastRef.current = null;
  };

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if(file.size > MAX_AVATAR_FILE_BYTES) {
        toast.error("File Too Big")
      }
      else setValue("img", file);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.settings}>
        <form id="profileForm" onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} id="newName" label="ОТОБРАЖАЕМОЕ ИМЯ" />

          <div className={s.separator}></div>

          <div className={s.avatar}>
            <h4>АВАТАР</h4>

            <div>
              <Button style={{ position: "relative" }} type="button">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg"
                  max={1}
                  className={s.cloudinary}
                  id="img"
                  onChange={handleUpload}
                />

                <span className={s.changeAva}>Смена аватара</span>
              </Button>

              <Button type="button">Удалить аватар</Button>
            </div>
          </div>
        </form>
      </div>

      <div className={s.preview}>
        <Avatar
          contWidth={90}
          contHeight={90}
          width={80}
          height={80}
          round
          showOnline
          online
          img={fileToBlob(watchAll.img)}
        ></Avatar>
      </div>
    </div>
  );
};
