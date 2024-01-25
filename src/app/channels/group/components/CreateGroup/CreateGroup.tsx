"use client";

import { FieldValues, useForm } from "react-hook-form";
import s from "./CreateGroup.module.scss";
import GroupSampleBox from "../GroupSampleBox/GroupSampleBox";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ServerApiService } from "@/api/server/serverApi.service";
import { CustomModal } from "@/components/CustomModal/CustomModal";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addServer } from "@/Redux/Slices/serverSlice";

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroup({ isOpen, onClose }: CreateGroupProps) {
  const userId = useTypedSelector((state) => state.auth.id);

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [next, setNext] = useState<boolean>(false);

  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleUploadedFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    const base64 = await convertToBase64(file);

    setPreview(base64 as string);
  };

  const convertToBase64 = (img: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async ({ name }: FieldValues) => {
    if (userId) {
      const server = await ServerApiService.createServer(name, preview, userId);
      dispatch(addServer(server))
    }
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      s={s}
      onAfterClose={() => setNext(false)}
    >
      <div className={clsx(s.container, next && s.next)}>
        <h2>Создайте сервер</h2>
        <p>
          Ваш сервер - это местоб где вы можете тусоваться со своими друзьями.
          Создайте сервер и ачните общаться
        </p>
        <div onClick={() => setNext(true)}>
          <GroupSampleBox text="Свой шаблон" img="/myGroupSample.svg" />
        </div>
        <h4>НАЧНИТЕ С ШАБЛОНА</h4>
        <div onClick={() => setNext(true)}>
          <GroupSampleBox text="Игры" img="/gameGroupSample.svg" />
        </div>
        <div onClick={() => setNext(true)}>
          <GroupSampleBox text="Школьный клуб" img="/schoolGroupSample.svg" />
        </div>
        <div onClick={() => setNext(true)}>
          <GroupSampleBox text="Учебная группа" img="/teachGroupSample.svg" />
        </div>

        <div
          onClick={onClose}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "15px",
            top: "15px",
            color: "#80848E",
            fontSize: "26px",
          }}
        >
          <RxCross2 />
        </div>
      </div>
      <div className={clsx(s.container, next && s.next)}>
        <h2>Персонализируйте свой сервер</h2>
        <p>
          Персонализируйте свой новый сервер, выбрав ему название и значок. Их
          можно будет изменить в любой момент
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputImgContainer}>
            <input
              {...register("img", { required: false })}
              accept="image/jpeg"
              className={s.imgInput}
              type="file"
              onChange={handleUploadedFile}
            />
            <Image
              width={80}
              height={80}
              alt="input image"
              src={preview ? preview : "/addImgToGroup.svg"}
            />
          </div>
          <h4>НАЗВАНИЕ СЕРВЕРА</h4>
          <input
            {...register("name", { required: true })}
            className={s.input}
          />
          <div className={s.footer}>
            <span onClick={() => setNext(false)}>Назад</span>
            <Button
              type="submit"
              style={{ width: "auto", padding: "10px 25px" }}
            >
              Создать
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
}
