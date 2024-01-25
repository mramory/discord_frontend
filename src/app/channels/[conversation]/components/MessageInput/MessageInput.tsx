"use client";

import { useForm } from "react-hook-form";
import s from "./MessageInput.module.scss";
import { MessagesApiService } from "@/api/messages/messagesApi.service";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { CldUploadButton } from "next-cloudinary";
import { AiFillPlusCircle } from "react-icons/ai";

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
    formState: { errors },
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

  const handleUpload = async (result: any) => {
    if (senderId) {
        await MessagesApiService.createMessage({
          image: result.info.secure_url,
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
