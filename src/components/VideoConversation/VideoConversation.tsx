"use client";

import clsx from "clsx";
import s from "./VideoConversation.module.scss";
import { useLocalStream } from "./hooks/useWebRTC";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleVideo } from "@/Redux/Slices/mediaSlice";
import { useColor } from "@/hooks/useColor";
import { VideoWindow } from "./VideoWindow/VideoWindow";

export type ClientType = {
  newClient: string,
  img: string
}

export default function VideoConversation({
  conversationId,
}: {
  conversationId: string;
}) {
  const { clients, provideMediaRef } = useLocalStream(conversationId);

  const dispatch = useAppDispatch();

  const silent = useTypedSelector((state) => state.media.silent);
  const video = useTypedSelector((state) => state.media.video);

  return (
    <div className={s.container}>
      {clients?.map((client: ClientType) => {
        return (
          <div
            key={client.newClient}
            className={clsx(
              s.box,
              clients.length > 2 && s.twoMore,
              clients.length > 4 && s.fourMore
            )}
          >
            <VideoWindow client={client} silent={silent} video={video} provideMediaRef={provideMediaRef} />
          </div>
        );
      })}
      <div>
        <button
          style={{ color: "#fff", cursor: "pointer" }}
          onClick={() => dispatch(toggleVideo())}
        >
          Video
        </button>
      </div>
    </div>
  );
}
