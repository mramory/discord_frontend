"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CustomModal } from "@/components/CustomModal/CustomModal";
import s from "./AddChannel.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import { ServerApiService } from "@/api/server/serverApi.service";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { ContentType } from "@/types/Conversation";
import clsx from "clsx";

interface AddChannelProps {
  serverId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface AddChannelFields {
  name: string;
}

export default function AddChannel({
  isOpen,
  onClose,
  serverId,
}: AddChannelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddChannelFields>();

  const [channelType, setChannelType] = useState<"TEXT" | "VIDEO">("TEXT");

  const onSubmit = async (data: AddChannelFields) => {
    const dto = {
      serverId,
      type: channelType,
      name: data.name,
    };
    onClose();
    await ServerApiService.createChannel(dto);
  };

  return (
    <CustomModal s={s} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.container}>
          <h3>Создать канал</h3>
          <p>ТИП КАНАЛА</p>

          <TypeBox activeType={channelType} setType={setChannelType} type={"TEXT"} />
          <TypeBox activeType={channelType} setType={setChannelType} type={"VIDEO"} />
          <p>НАЗВАНИЕ КАНАЛА</p>
          <input
            {...register("name", { required: true })}
            placeholder="новый-канал"
          />

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
        <div className={s.footer}>
          <div>
            <p onClick={onClose} className={s.cancel}>
              Отмена
            </p>
            <Button
              style={{ fontSize: "14px", lineHeight: "1em", width: "auto" }}
              type="submit"
            >
              Создать канал
            </Button>
          </div>
        </div>
      </form>
    </CustomModal>
  );
}

interface TypeBoxProps {
  type: "TEXT" | "VIDEO",
  activeType: "TEXT" | "VIDEO",
  setType: Dispatch<SetStateAction<"TEXT" | "VIDEO">>
}

const TypeBox = ({type, setType, activeType}: TypeBoxProps) => {
  return(
    <div onClick={() => setType(type)} className={clsx(s.typeBoxContainer, activeType === type && s.activeTypeBox)}>
      <div>
        <Image width={24} height={24} alt="img" src={type === "TEXT" ? "/textChannel.svg" : "/voiceChannel.svg"} />
      </div>
      <div>
        <p className={s.typeName}>{type === "TEXT" ? "Text" : "Video"}</p>
        <span>Отправляйте сообщения, изображения, GIF, эмодзи, мнения и приколы</span>
      </div>
      <div>
        <Image width={24} height={24} alt="img" src={activeType === type ? "/radioActive.svg" : "/radioNotActive.svg"} />
      </div>
    </div>
  )
}
