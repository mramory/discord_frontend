"use client";

import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { AiFillPlusCircle } from "react-icons/ai";
import { MessagesApiService } from "@/api/messages/messagesApi.service";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import s from "./MessageInput.module.scss";

interface MessageInputProps {
  conversationId: string;
}

type FormValues = {
  text: string;
};

export default function MessageInput({ conversationId }: MessageInputProps) {
  const senderId = useTypedSelector((state) => state.auth.id);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (senderId) {
      await MessagesApiService.createMessage({
        ...data,
        senderId,
        conversationId,
      });
      reset({ text: "" });
    }
  };

  const handleUpload = async (result: CldUploadWidgetResults) => {
    if (senderId && result.info && typeof result.info === "object") {
        const info = result.info as { secure_url: string };
        await MessagesApiService.createMessage({
          image: info.secure_url,
          senderId,
          conversationId,
        });
    }
  };


  return (
    <div className={s.container}>
      <CldUploadButton
        className={s.cloudinary}
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ib6w1cas"
      >
        <AiFillPlusCircle size={24} />
      </CldUploadButton>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text", { required: true })}
          placeholder="Написать"
          className={s.input}
        />
      </form>
    </div>
  );
}
