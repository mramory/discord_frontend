import { Avatar } from "@/components/Avatar/Avatar";
import { ClientType } from "../VideoConversation";
import s from "../VideoConversation.module.scss";
import { useColor } from "@/hooks/useColor";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setVideo } from "@/Redux/Slices/mediaSlice";

interface VideoWindowProps {
  client: ClientType;
  silent: boolean;
  video: boolean;
  provideMediaRef: (id: string, node: HTMLVideoElement) => void;
}

export const VideoWindow = ({
  client,
  silent,
  video,
  provideMediaRef,
}: VideoWindowProps) => {
  const color = useColor(client.img);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setVideo(false))
  }, [])
  return (
    <>
      <video
        muted={silent}
        playsInline
        autoPlay
        ref={(instance) => {
          if (instance) {
            provideMediaRef(client.newClient, instance);
          }
        }}
      />
      {false && color && (
        <div style={{ backgroundColor: color }} className={s.videoPlaceholder}>
          <Avatar
            round
            img={client.img}
            width={90}
            height={90}
            contHeight={90}
            contWidth={90}
          />
        </div>
      )}
    </>
  );
};
