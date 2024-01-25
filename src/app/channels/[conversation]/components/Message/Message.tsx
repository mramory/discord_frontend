import { Avatar } from "@/components/Avatar/Avatar";
import s from "./Message.module.scss";
import { MessageType } from "@/types/Message";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "@/components/ImageModal/ImageModal";
import { Dispatch, SetStateAction, useState } from "react";

interface MessageProps {
  message: MessageType;
  prevMessage: MessageType;
  index: number;
}

export default function Message({ message, prevMessage, index }: MessageProps) {
  const createdAt = new Date(message.createdAt);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      {prevMessage.senderId !== message.senderId || index === 0 ? (
        <FirstMessage
          message={message}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          createdAt={createdAt}
        />
      ) : (
        <NotFirstMessage
          message={message}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          createdAt={createdAt}
        />
      )}
    </>
  );
}

type FirstMessageProps = Omit<MessageProps, "prevMessage" | "index"> & {
  createdAt: Date;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FirstMessage = ({
  message,
  createdAt,
  isModalOpen,
  setIsModalOpen,
}: FirstMessageProps) => {
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        <Avatar
          round={true}
          width={40}
          height={40}
          contHeight={40}
          contWidth={40}
          img={message.sender.img}
        />
      </div>
      <div>
        <div className={s.meta}>
          <span>{message.sender.name}</span>
          <span>{format(createdAt, "dd.M.y H:mm")}</span>
        </div>
        {message.image ? (
          <>
            <ImageModal
              src={message.image}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <div
              onClick={() => setIsModalOpen(true)}
              style={{ overflow: "hidden" }}
            >
              <Image
                className={s.img}
                width={200}
                height={300}
                alt="img"
                src={message.image}
              />
            </div>
          </>
        ) : (
          <div className={s.text}>{message.text}</div>
        )}
      </div>
    </div>
  );
};

const NotFirstMessage = ({
  message,
  isModalOpen,
  setIsModalOpen,
  createdAt,
}: FirstMessageProps) => {
  return (
    <div className={s.notFirstContainer}>
      <div className={s.timeStamp}>
        <span>{format(createdAt, "H:mm")}</span>
      </div>
      {message.image ? (
        <>
          <ImageModal
            src={message.image}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <div
            onClick={() => setIsModalOpen(true)}
            style={{ overflow: "hidden" }}
          >
            <Image
              className={s.img}
              width={200}
              height={300}
              alt="img"
              src={message.image}
            />
          </div>
        </>
      ) : (
        <div className={s.text}>{message.text}</div>
      )}
    </div>
  );
};
